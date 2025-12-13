import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const supportedFormats = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleDragEnter = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e?.dataTransfer?.files);
    processFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files?.filter(file => {
      if (!supportedFormats?.includes(file?.type)) {
        console.error(`Unsupported format: ${file?.name}`);
        return false;
      }
      if (file?.size > maxFileSize) {
        console.error(`File too large: ${file?.name}`);
        return false;
      }
      return true;
    });

    validFiles?.forEach(file => {
      simulateUpload(file);
    });
  };

  const simulateUpload = (file) => {
    const fileId = `${file?.name}_${Date.now()}`;
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev?.[fileId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress?.[fileId];
              return newProgress;
            });

            const mockFile = {
              id: fileId,
              fileName: file?.name,
              fileSize: file?.size,
              fileType: file?.type,
              uploadedAt: new Date(),
              status: 'processing'
            };
            onFilesAdded(mockFile);
          }, 500);
          return prev;
        }
        return { ...prev, [fileId]: currentProgress + 10 };
      });
    }, 200);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes?.[i];
  };

  const uploadingFiles = Object.keys(uploadProgress);

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
          <Icon name="Upload" size={20} color="var(--color-secondary)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">File Upload</h2>
          <p className="text-sm text-muted-foreground">Upload audio files for batch analysis</p>
        </div>
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-200
          ${isDragging 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".mp3,.wav,.m4a"
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="FileAudio" size={32} color="var(--color-muted-foreground)" />
          </div>

          <h3 className="text-lg font-medium text-foreground mb-2">
            {isDragging ? 'Drop files here' : 'Drag & drop audio files'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse from your device
          </p>

          <Button
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            iconName="FolderOpen"
            iconPosition="left"
          >
            Browse Files
          </Button>

          <div className="mt-6 pt-6 border-t border-border w-full">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="HardDrive" size={16} />
                <span>Max 50MB per file</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {uploadingFiles?.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-foreground">Uploading Files</h3>
          {uploadingFiles?.map(fileId => (
            <div key={fileId} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Icon name="FileAudio" size={20} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {fileId?.split('_')?.[0]}
                  </span>
                </div>
                <span className="text-sm font-medium text-primary ml-4">
                  {uploadProgress?.[fileId]}%
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${uploadProgress?.[fileId]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;