import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Image as ImageIcon, Upload, Check, Trash2, Copy, HardDrive, FileImage, Sparkles, CheckCircle2 } from 'lucide-react';

export const MediaManagerCMS: React.FC = () => {
  const { mediaAssets = [], mediaFiles = [], uploadMediaAsset, addMediaFile, deleteMediaAsset, deleteMediaFile } = useApp();
  const safeMedia = Array.isArray(mediaAssets) && mediaAssets.length > 0 ? mediaAssets : (Array.isArray(mediaFiles) ? mediaFiles : []);
  const uploader = uploadMediaAsset || addMediaFile;
  const deleter = deleteMediaAsset || deleteMediaFile;

  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');

  // File Upload State
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSizeKb, setFileSizeKb] = useState<number>(0);
  const [fileDimensions, setFileDimensions] = useState<string>('1920 x 1080');
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // URL Upload State
  const [uploadUrlName, setUploadUrlName] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local file selection
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WEBP, GIF, SVG).');
      return;
    }

    const kb = Math.round(file.size / 1024);
    setFileSizeKb(kb);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedFilePreview(dataUrl);

      // Measure image dimensions
      const img = new Image();
      img.onload = () => {
        setFileDimensions(`${img.width} x ${img.height}`);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleLocalUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFilePreview || !fileName) return;

    setIsUploading(true);

    const rawExt = (fileName.split('.').pop() || 'webp').toLowerCase();
    const validFormats: ('webp' | 'png' | 'jpg' | 'mp4' | 'svg')[] = ['webp', 'png', 'jpg', 'mp4', 'svg'];
    const format = validFormats.includes(rawExt as any)
      ? (rawExt as 'webp' | 'png' | 'jpg' | 'mp4' | 'svg')
      : 'webp';

    setTimeout(() => {
      uploader({
        name: fileName,
        url: selectedFilePreview, // Local Data URL stored directly in server state
        sizeKb: fileSizeKb || 180,
        format,
        folder: 'cinematic-local',
        dimensions: fileDimensions,
      });

      setIsUploading(false);
      setSuccessMessage(`File "${fileName}" berhasil diunggah & tersimpan langsung di server lokal!`);
      setSelectedFilePreview(null);
      setFileName('');
      setFileSizeKb(0);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setTimeout(() => setSuccessMessage(''), 4000);
    }, 400);
  };

  const handleUrlUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrlName || !uploadUrl) return;

    uploader({
      name: uploadUrlName,
      url: uploadUrl,
      sizeKb: 240,
      format: 'webp',
      folder: 'cinematic-remote',
      dimensions: '1920 x 1080',
    });

    setSuccessMessage(`Aset URL "${uploadUrlName}" berhasil ditambahkan!`);
    setUploadUrlName('');
    setUploadUrl('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display uppercase text-white flex items-center">
            <HardDrive className="w-6 h-6 mr-3 text-[#C5A059]" />
            Media Manager & Penyimpanan File Lokal
          </h1>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Unggah gambar langsung dari komputer/HP Anda. Gambar disimpan dalam database & storage server internal NFI.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-gray-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Storage Server Status: <strong className="text-emerald-400">Aktif (Local Direct Storage)</strong></span>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs font-mono flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Upload Box Container */}
      <div className="p-6 bg-[#121214] border border-white/10 rounded-xl space-y-6 shadow-xl">
        {/* Sub-tabs for Upload Mode */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`px-4 py-2 rounded text-xs font-mono font-bold flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'file'
                ? 'bg-[#C5A059] text-black shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Pilih File Langsung dari Komputer / HP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-4 py-2 rounded text-xs font-mono font-bold flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'url'
                ? 'bg-[#C5A059] text-black shadow-md'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <FileImage className="w-4 h-4" />
            <span>Input via URL Website Lain</span>
          </button>
        </div>

        {/* MODE 1: DIRECT LOCAL FILE UPLOAD */}
        {activeTab === 'file' && (
          <form onSubmit={handleLocalUploadSubmit} className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                dragActive
                  ? 'border-[#C5A059] bg-[#C5A059]/10 scale-[1.01]'
                  : selectedFilePreview
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-white/20 bg-[#18181C] hover:border-[#C5A059]/60 hover:bg-white/[0.02]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFilePreview ? (
                <div className="space-y-3 flex flex-col items-center">
                  <div className="relative w-48 aspect-video rounded-lg overflow-hidden border border-[#C5A059] shadow-lg">
                    <img src={selectedFilePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold font-mono text-white">{fileName}</span>
                    <span className="text-[11px] text-[#C5A059] font-mono block">
                      Ukuran: {fileSizeKb} KB • Dimensi: {fileDimensions}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono underline">
                    Klik untuk memilih file lain
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-bold font-display text-white block">
                      Klik di sini atau Seret (Drag & Drop) File Gambar Komputer Anda
                    </span>
                    <span className="text-xs text-gray-400 font-mono block">
                      Mendukung format: JPG, PNG, WEBP, GIF, SVG (Maksimal 10MB)
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-[#C5A059] text-black font-bold font-mono text-xs uppercase tracking-wider rounded shadow-md mt-2">
                    Buka File Manager / Komputer
                  </div>
                </>
              )}
            </div>

            {selectedFilePreview && (
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFilePreview(null);
                    setFileName('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs rounded cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#DBC07D] text-black font-bold font-mono text-xs uppercase tracking-wider rounded transition-colors shadow-lg flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isUploading ? 'Menyimpan File...' : 'Simpan File Ke Server Lokal NFI'}</span>
                </button>
              </div>
            )}
          </form>
        )}

        {/* MODE 2: URL INPUT */}
        {activeTab === 'url' && (
          <form onSubmit={handleUrlUploadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="block text-gray-400 mb-1">Nama Label File</label>
              <input
                type="text"
                required
                placeholder="Contoh: poster_film_2026.jpg"
                value={uploadUrlName}
                onChange={(e) => setUploadUrlName(e.target.value)}
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">URL Sumber Gambar Eksternal</label>
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/..."
                value={uploadUrl}
                onChange={(e) => setUploadUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#18181C] border border-white/10 rounded text-white focus:border-[#C5A059] outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-[#C5A059] text-black font-bold uppercase rounded hover:bg-[#DBC07D] cursor-pointer"
              >
                Simpan dari URL
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Media Library Grid */}
      <div className="bg-[#121214] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-sm font-bold font-mono uppercase text-[#C5A059] flex items-center">
            <ImageIcon className="w-4 h-4 mr-2" />
            Daftar File Gambar Tersimpan Di Server ({safeMedia.length} File)
          </h3>
          <span className="text-xs font-mono text-gray-400">
            Storage Engine: Local Persistent Browser Storage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeMedia.map((asset) => (
            <div
              key={asset.id}
              className="p-4 bg-[#18181C] border border-white/10 rounded-xl space-y-3 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors shadow-lg"
            >
              <div className="space-y-2">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black group">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[#C5A059] text-[10px] font-mono rounded border border-[#C5A059]/30">
                    {asset.format ? asset.format.toUpperCase() : 'WEBP'} • {asset.sizeKb || 240} KB
                  </span>
                  {asset.url.startsWith('data:image') && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-500 text-black font-bold text-[9px] font-mono rounded shadow">
                      LOCAL FILE
                    </span>
                  )}
                </div>

                <span className="block text-xs font-bold font-mono text-white truncate" title={asset.name}>
                  {asset.name}
                </span>
                <span className="text-[10px] text-gray-400 font-mono block">
                  Dimensi: {asset.dimensions} • Tanggal: {asset.uploadedAt}
                </span>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => copyToClipboard(asset.url)}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/15 text-gray-300 text-[10px] font-mono rounded flex items-center space-x-1 cursor-pointer"
                >
                  {copiedUrl === asset.url ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#C5A059]" />
                      <span>Gunakan Gambar Ini</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => deleter && deleter(asset.id)}
                  className="p-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded cursor-pointer"
                  title="Hapus Aset Media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
