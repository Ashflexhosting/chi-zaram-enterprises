import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Copy, FileText, Image, Loader2, LockKeyhole, UploadCloud } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
type AssetCategory = "product" | "gallery" | "brand" | "document" | "other";

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The file could not be read."));
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.split(",")[1] ?? "");
    };
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AssetLibrary() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const utils = trpc.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<AssetCategory>("product");
  const assetsQuery = trpc.assets.list.useQuery(undefined, { enabled: isAdmin });
  const uploadMutation = trpc.assets.upload.useMutation({
    onSuccess: async () => {
      await utils.assets.list.invalidate();
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
      toast.success("Asset stored securely and added to the library.");
    },
    onError: error => toast.error(error.message || "Upload failed. Please try again."),
  });

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    if (!acceptedTypes.includes(file.type as (typeof acceptedTypes)[number])) {
      toast.error("Choose a JPG, PNG, WEBP, GIF, PDF, DOC, or DOCX file.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast.error("Files must be 8 MB or smaller.");
      event.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const uploadAsset = async () => {
    if (!selectedFile) {
      toast.error("Choose a file before uploading.");
      return;
    }
    const dataBase64 = await readAsBase64(selectedFile);
    await uploadMutation.mutateAsync({
      fileName: selectedFile.name,
      contentType: selectedFile.type as (typeof acceptedTypes)[number],
      category,
      dataBase64,
    });
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.success("Storage URL copied to clipboard.");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl space-y-7">
        <section className="overflow-hidden rounded-2xl border border-[#d3c3ae] bg-[#435847] p-7 text-[#fffaf3] shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#f0c875]">CHI-ZARAM operations</p>
              <h1 className="mt-3 font-serif text-4xl leading-none sm:text-5xl">Business asset library</h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#e9dfd2]">Upload product photography, brand materials, gallery files, and documents to managed storage. File records remain private to the owner workspace while the site can safely reference approved asset URLs.</p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#f0c875]/30 bg-[#292a25]/25 px-4 py-2 text-xs font-bold text-[#f0c875]"><LockKeyhole size={15} /> Owner-managed</div>
          </div>
        </section>

        {!isAdmin ? (
          <section className="rounded-2xl border border-[#ded2c0] bg-[#fffaf3] p-8 text-center shadow-sm">
            <LockKeyhole className="mx-auto h-8 w-8 text-[#9f2f2a]" />
            <h2 className="mt-4 font-serif text-3xl text-[#292a25]">Owner access required</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#746f64]">This workspace is reserved for the CHI-ZARAM project owner. Sign in with the owner account to upload and manage stored assets.</p>
          </section>
        ) : (
          <>
            <section className="grid gap-6 rounded-2xl border border-[#ded2c0] bg-[#fffaf3] p-6 shadow-sm lg:grid-cols-[1fr_0.85fr]">
              <div>
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f4efe6] text-[#9f2f2a]"><UploadCloud size={20} /></span><div><h2 className="font-serif text-3xl text-[#292a25]">Add an approved asset</h2><p className="mt-1 text-sm text-[#746f64]">Up to 8 MB per file. JPG, PNG, WEBP, GIF, PDF, DOC, and DOCX are supported.</p></div></div>
                <input ref={inputRef} className="sr-only" id="asset-upload" type="file" accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,.doc,.docx" onChange={selectFile} />
                <label htmlFor="asset-upload" className="mt-6 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#c99a4a] bg-[#f4efe6] px-5 text-center transition hover:border-[#9f2f2a] hover:bg-[#fffaf3]"><UploadCloud className="h-7 w-7 text-[#9f2f2a]" /><strong className="mt-3 text-sm text-[#435847]">Choose a file to upload</strong><span className="mt-1 text-xs text-[#746f64]">{selectedFile ? `${selectedFile.name} · ${formatBytes(selectedFile.size)}` : "Stored through secure managed storage"}</span></label>
              </div>
              <div className="flex flex-col justify-between rounded-xl bg-[#f4efe6] p-5">
                <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#746f64]">Asset category<select value={category} onChange={event => setCategory(event.target.value as AssetCategory)} className="mt-3 block w-full rounded-lg border border-[#d3c3ae] bg-[#fffaf3] px-3 py-3 text-sm font-semibold text-[#292a25] outline-none ring-[#9f2f2a] focus:ring-2"><option value="product">Product imagery</option><option value="gallery">Gallery imagery</option><option value="brand">Brand assets</option><option value="document">Documents</option><option value="other">Other</option></select></label>
                <button type="button" onClick={uploadAsset} disabled={!selectedFile || uploadMutation.isPending} className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#9f2f2a] px-5 text-sm font-extrabold text-[#fffaf3] transition hover:bg-[#7f2420] disabled:cursor-not-allowed disabled:opacity-45"><UploadCloud size={17} />{uploadMutation.isPending ? "Storing asset…" : "Store asset"}</button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#ded2c0] bg-[#fffaf3] p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#9f2f2a]">Stored files</p><h2 className="mt-2 font-serif text-3xl text-[#292a25]">Approved asset records</h2></div><span className="rounded-full bg-[#f4efe6] px-3 py-1 text-xs font-bold text-[#746f64]">{assetsQuery.data?.length ?? 0} assets</span></div>
              {assetsQuery.isLoading ? <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#746f64]"><Loader2 className="h-4 w-4 animate-spin" /> Loading asset records…</div> : assetsQuery.data?.length ? <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{assetsQuery.data.map(asset => <article key={asset.id} className="overflow-hidden rounded-xl border border-[#e6dacb] bg-[#fdfaf5]"><div className="grid aspect-[4/2.35] place-items-center bg-[#f4efe6]">{asset.contentType.startsWith("image/") ? <img src={asset.url} alt={asset.fileName} className="h-full w-full object-cover" /> : <FileText className="h-9 w-9 text-[#9f2f2a]" />}</div><div className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-sm font-extrabold text-[#292a25]">{asset.fileName}</h3><p className="mt-1 text-xs text-[#746f64]">{asset.category} · {formatBytes(asset.sizeBytes)}</p></div><Image className="h-4 w-4 shrink-0 text-[#c99a4a]" /></div><div className="mt-4 flex items-center justify-between gap-3"><a href={asset.url} target="_blank" rel="noreferrer" className="text-xs font-extrabold text-[#9f2f2a] underline underline-offset-4">Open file</a><button type="button" onClick={() => copyUrl(asset.url)} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#435847]"><Copy size={13} /> Copy URL</button></div></div></article>)}</div> : <div className="mt-6 rounded-xl border border-dashed border-[#d3c3ae] bg-[#f4efe6] px-6 py-14 text-center"><CheckCircle2 className="mx-auto h-7 w-7 text-[#435847]" /><p className="mt-3 text-sm font-bold text-[#435847]">Your stored asset records will appear here.</p><p className="mt-1 text-xs text-[#746f64]">Start by uploading a product image, gallery photo, brand asset, or document.</p></div>}
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
