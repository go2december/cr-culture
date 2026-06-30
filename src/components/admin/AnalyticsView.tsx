'use client'

import React from 'react'

export const AnalyticsView: React.FC = () => {
  const shareUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL

  if (!shareUrl) {
    return (
      <div 
        style={{ 
          padding: '40px 32px',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <h1 style={{ margin: '0 0 24px 0', fontSize: '2rem', fontWeight: 700, color: 'var(--theme-elevation-800, #0f172a)' }}>
          📊 รายงานสถิติการเข้าชม
        </h1>
        <div 
          style={{ 
            padding: '24px', 
            backgroundColor: 'var(--theme-elevation-50, #f8fafc)', 
            border: '1px solid var(--theme-elevation-150, #e2e8f0)', 
            borderRadius: '8px'
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', fontWeight: 600, color: 'var(--theme-elevation-800, #0f172a)' }}>
            สถิติการเข้าชมเว็บไซต์ (Umami Analytics)
          </h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: 'var(--theme-elevation-600, #475569)' }}>
            ระบบวิเคราะห์สถิติติดตั้งสำเร็จแล้ว แต่ยังไม่ได้เชื่อมต่อแชร์ลิงก์ข้อมูลในระบบหลังบ้าน
          </p>
          <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--theme-elevation-600, #475569)' }}>
            <strong>วิธีเปิดแสดงผล:</strong> คัดลอก Share URL จากแดชบอร์ด Umami มากำหนดในตัวแปรสภาพแวดล้อม <code>NEXT_PUBLIC_UMAMI_SHARE_URL</code> ในไฟล์ <code>.env</code>
          </p>
          <div style={{ display: 'inline-block', fontSize: '0.75rem', padding: '6px 12px', backgroundColor: 'var(--theme-elevation-100, #cbd5e1)', borderRadius: '4px', color: 'var(--theme-elevation-700, #334155)' }}>
            รอการกำหนดค่า: NEXT_PUBLIC_UMAMI_SHARE_URL
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: 'calc(100vh - 120px)', 
        padding: '32px 32px 16px 32px', 
        boxSizing: 'border-box',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        overflow: 'hidden'
      }}
    >
      <h1 style={{ margin: '0 0 20px 0', fontSize: '1.75rem', fontWeight: 700, color: 'var(--theme-elevation-800, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        📊 รายงานสถิติการเข้าชมเว็บไซต์ (Umami Analytics)
      </h1>
      <div 
        style={{ 
          flexGrow: 1, 
          width: '100%', 
          height: '100%',
          border: '1px solid var(--theme-elevation-150, #cbd5e1)', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
        }}
      >
        <iframe
          src={shareUrl}
          frameBorder="0"
          width="100%"
          height="100%"
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%', 
            border: 'none',
            backgroundColor: '#ffffff'
          }}
          title="Umami Full Analytics Dashboard"
        />
      </div>
    </div>
  )
}
