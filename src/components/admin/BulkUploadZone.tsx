'use client'

import React, { useState, useRef } from 'react'
import { useField } from '@payloadcms/ui'

export const BulkUploadZone: React.FC = () => {
  const { value, setValue } = useField<unknown[]>({ path: 'gallery' })
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    if (files.length === 0) return

    setUploading(true)
    setProgress({ current: 0, total: files.length })

    const uploadedIds: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name.split('.')[0] || 'Uploaded image')

      try {
        const res = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        })

        if (res.ok) {
          const data = await res.json()
          const id = data.doc?.id || data.id
          if (id) {
            uploadedIds.push(String(id))
          }
        }
      } catch (err) {
        console.error('Error uploading file:', err)
      }

      setProgress((prev) => ({ ...prev, current: i + 1 }))
    }

    if (uploadedIds.length > 0) {
      const currentGallery = Array.isArray(value) ? value : []
      const updatedGallery = [...currentGallery, ...uploadedIds]
      setValue(updatedGallery)
    }

    setUploading(false)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const triggerSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div 
      style={{
        padding: '24px',
        border: '2px dashed var(--theme-elevation-200, #cbd5e1)',
        borderRadius: '8px',
        backgroundColor: 'var(--theme-elevation-50, #f8fafc)',
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        if (e.dataTransfer.files) {
          handleFiles(e.dataTransfer.files)
        }
      }}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      {uploading ? (
        <div style={{ color: 'var(--theme-elevation-800, #0f172a)', fontWeight: 500 }}>
          ⏳ กำลังอัปโหลดรูปภาพและเพิ่มเข้าแกลเลอรีอัตโนมัติ: {progress.current} / {progress.total} รูป...
          <div 
            style={{ 
              width: '100%', 
              height: '6px', 
              backgroundColor: 'var(--theme-elevation-200, #e2e8f0)', 
              borderRadius: '3px',
              marginTop: '10px',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{ 
                height: '100%', 
                width: `${(progress.current / progress.total) * 100}%`, 
                backgroundColor: 'var(--theme-success-500, #10b981)',
                transition: 'width 0.2s ease-in-out'
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: 'var(--theme-elevation-600, #475569)' }}>
            ลากและวางไฟล์รูปภาพหลายๆ รูปที่นี่ เพื่ออัปโหลดและใส่เข้าแกลเลอรีอัตโนมัติ หรือ
          </p>
          <button
            type="button"
            onClick={triggerSelect}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--theme-elevation-800, #0f172a)',
              color: 'var(--theme-elevation-0, #ffffff)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.85rem'
            }}
          >
            📸 เลือกไฟล์ภาพหลายรูปจากคอมพิวเตอร์ของคุณ
          </button>
        </div>
      )}
    </div>
  )
}
