const test = require('node:test');
const assert = require('node:assert/strict');
const loadTs = require('./helpers/load-ts.cjs');
const {contactSchema} = loadTs('lib/contact.ts');
const values = {name:'Client test',email:'client@example.test',tel:'0612345678',subject:'Rénovation',message:'Une demande de travaux.'};
function fixture(responses, configured=true) {
    const calls=[];
    class Resend {
        constructor(key) { assert.equal(key,'test-key'); this.emails={send:async payload=>{
            calls.push(payload); const result=responses.shift(); if (result instanceof Error) throw result; return result;
        }}; }
    }
    if(configured) process.env.RESEND_API_KEY='test-key'; else delete process.env.RESEND_API_KEY;
    process.env.CONTACT_EMAIL='artisan@example.test';
    process.env.RESEND_FROM_EMAIL='contact@example.test';
    const {POST}=loadTs('app/api/send/route.ts',{
        resend:{Resend}, '@/lib/contact':{contactSchema},
        '@/components/email/email-info-template':{EmailInfoTemplate:props=>props},
        '@/components/email/email-client-template-custom':{EmailToClientTemplateCustom:props=>props},
    });
    return {calls,post:body=>POST(new Request('http://localhost/api/send',{method:'POST',body:typeof body==='string'?body:JSON.stringify(body)}))};
}
const accepted=()=>({data:{id:'test-id'},error:null});
test('Resend transmet la demande et l’accusé aux bons destinataires avec reply-to',async()=>{
    const f=fixture([accepted(),accepted()]);const r=await f.post(values);
    assert.equal(r.status,200);assert.deepEqual(await r.json(),{success:true,confirmationSent:true});
    assert.equal(f.calls.length,2);assert.equal(f.calls[0].to,'artisan@example.test');assert.equal(f.calls[0].reply_to,values.email);
    assert.equal(f.calls[1].to,values.email);assert.equal(f.calls[1].reply_to,'artisan@example.test');assert.equal(f.calls[0].from,'contact@example.test');
});
test('JSON ou champs invalides ne déclenchent aucun envoi',async()=>{
    const f=fixture([]);assert.equal((await f.post('{')).status,400);assert.equal((await f.post({...values,email:'invalid'})).status,400);assert.equal(f.calls.length,0);
});
test('une clé serveur absente renvoie 503 sans envoi',async()=>{
    const f=fixture([],false);assert.equal((await f.post(values)).status,503);assert.equal(f.calls.length,0);
});
test('un refus ou une exception Resend renvoie 502 et ne déclenche pas l’accusé',async()=>{
    for(const failure of [{data:null,error:{message:'private error'}},new Error('private error')]){
        const f=fixture([failure]);const r=await f.post(values);assert.equal(r.status,502);assert.equal(f.calls.length,1);assert.ok(!JSON.stringify(await r.json()).includes('private error'));
    }
});
test('un échec de l’accusé ne fait pas renvoyer une demande déjà transmise',async()=>{
    for(const failure of [{data:null,error:{message:'failed'}},new Error('failed')]){
        const f=fixture([accepted(),failure]);const r=await f.post(values);assert.equal(r.status,200);assert.deepEqual(await r.json(),{success:true,confirmationSent:false});
    }
});
