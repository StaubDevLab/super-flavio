import supabase from "@/lib/storage";



// Upload file using standard upload
async function uploadFile(file:File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data, error } = await supabase.storage.from('images').upload(`${new Date().getTime()}-${file.name}`,file)
    if (error) {
        throw new Error(error.message)
    }
    return data
}

export default uploadFile;