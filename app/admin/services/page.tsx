'use client';
import { useState } from "react";
import { open } from "@/stores/dialog-slice";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useServices } from "@/utils/queries/useServices";
import { useSession } from "next-auth/react";
import UpdateService from "@/components/admin/services/UpdateService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/header/Header";
import { Plus, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
export default function AdminPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const session = useSession({ required: true, onUnauthenticated: () => router.push("/api/auth/signin") });
    const { data: services = [], isPending, isError, refetch } = useServices();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tous");
    const [status, setStatus] = useState("Tous");
    const categories = Array.from(new Set(services.map(service => service.category || "Plomberie")));
    const filtered = services.filter(service => `${service.title} ${service.category}`.toLocaleLowerCase('fr').includes(search.toLocaleLowerCase('fr')) && (category === "Tous" || (service.category || "Plomberie") === category) && (status === "Tous" || (status === "Publiés" ? service.active : !service.active)));
    return <>
        <Header />
        <main className="site-container flex-grow py-12">
            <div className="flex flex-col sm:flex-row justify-between gap-5 sm:items-end">
                <div>
                    <Link href="/admin" className="text-sm text-muted-foreground">← Votre espace artisan</Link>
                    <p className="eyebrow mt-5">VOTRE ESPACE ARTISAN</p>
                    <h1 className="section-title">Gérer vos services</h1>
                    <p className="text-muted-foreground text-sm mt-3">Vos métiers, vos prestations, votre vitrine. Tout se gère ici.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link href="/services" className="btn-outline">Voir le site <ArrowUpRight size={16} />
                    </Link>
                    <Button className="h-auto py-3.5" onClick={() => dispatch(open(undefined))} disabled={session.status !== "authenticated"}>
                        <Plus size={16} className="mr-2" />Créer un service</Button>
                </div>
            </div>
            {session.status === "authenticated" && <>
                {!isPending && !isError && <div className="grid sm:grid-cols-3 gap-4 my-8">
                    {[["Services", services.length], ["Publiés sur le site", services.filter(service => service.active).length], ["Mis en avant", services.filter(service => service.featured && service.active).length]].map(([label, count]) =>
                        <div key={label} className="rounded-xl border bg-white p-5">
                            <p className="text-3xl font-semibold">
                                {count}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                {label}
                            </p>
                        </div>)}
                </div>}
                <div className="my-6 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={17} className="absolute left-3 top-3 text-muted-foreground" />
                        <Input aria-label="Rechercher un service" value={search} onChange={event => setSearch(event.target.value)} placeholder="Rechercher un service ou un métier…" className="pl-10 bg-white" />
                    </div>
                    <select aria-label="Filtrer par métier" value={category} onChange={event => setCategory(event.target.value)} className="h-10 rounded-lg border bg-white px-3 text-sm">
                        <option value="Tous">Tous les métiers</option>
                        {categories.map(item =>
                            <option key={item}>
                                {item}
                            </option>)}
                    </select>
                    <select aria-label="Filtrer par publication" value={status} onChange={event => setStatus(event.target.value)} className="h-10 rounded-lg border bg-white px-3 text-sm">
                        <option value="Tous">Tous les statuts</option>
                        <option>Publiés</option>
                        <option>Brouillons</option>
                    </select>
                </div>
                {isPending ? <p role="status" className="p-10 text-center text-muted-foreground">Chargement des services…</p> : isError ? <div role="alert" className="p-8 rounded-xl border bg-white text-center">
                    <p>Impossible de charger les services.</p>
                    <Button variant="outline" className="mt-4" onClick={() => refetch()}>Réessayer</Button>
                </div> : <>
                    <div className="mb-3 text-xs text-muted-foreground" aria-live="polite">
                        {filtered.length} service(s) affiché(s)</div>
                    <DataTable columns={columns} data={filtered} />
                </>}
                <UpdateService />
            </>}
            <Toaster />
        </main>
    </>;
}
