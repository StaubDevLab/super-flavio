import supabase from "@/lib/storage";
// Upload file using standard upload
async function uploadFile(file: File) {
    const { data, error } = await supabase.storage.from('images').upload(`${crypto.randomUUID()}-${file.name}`, file);
    if (error) {
        throw new Error(error.message);
    }
    return data;
}
export default uploadFile;
