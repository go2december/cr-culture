'use client'

import React from 'react'

export const AnalyticsWidget: React.FC = () => {
  const shareUrl = process.env.NEXT_PUBLIC_UMAMI_SHARE_URL

  if (!shareUrl) {
    return (
      <div 
        style={{ 
          padding: '24px', 
          backgroundColor: 'var(--theme-elevation-50, #f8fafc)', 
          border: '1px solid var(--theme-elevation-150, #e2e8f0)', 
          borderRadius: '8px', 
          marginTop: '32px',
          fontFamily: 'var(--font-sans, system-ui, sans-serif)'
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', fontWeight: 600, color: 'var(--theme-elevation-800, #0f172a)' }}>
          📊 สถิติการเข้าชมเว็บไซต์ (Analytics)
        </h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: 'var(--theme-elevation-600, #475569)' }}>
          ระบบวิเคราะห์สถิติ Umami Analytics ติดตั้งสำเร็จแล้ว แต่ยังไม่ได้เชื่อมต่อแดชบอร์ดแสดงผลในระบบหลังบ้าน
        </p>
        <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--theme-elevation-600, #475569)' }}>
          <strong>วิธีเปิดแสดงผล:</strong> คัดลอก Share URL จากแดชบอร์ด Umami มากำหนดในตัวแปรสภาพแวดล้อม <code>NEXT_PUBLIC_UMAMI_SHARE_URL</code> ในไฟล์ <code>.env</code>
        </p>
        <div style={{ display: 'inline-block', fontSize: '0.75rem', padding: '6px 12px', backgroundColor: 'var(--theme-elevation-100, #cbd5e1)', borderRadius: '4px', color: 'var(--theme-elevation-700, #334155)' }}>
          รอการกำหนดค่า: NEXT_PUBLIC_UMAMI_SHARE_URL
        </div>
      </div>
    )
  }

  return (
    <div 
      style={{ 
        marginTop: '32px', 
        width: '100%',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: 600, color: 'var(--theme-elevation-800, #0f172a)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        📊 สถิติการเข้าชมเว็บไซต์ (Umami Analytics)
      </h3>
      <div 
        style={{ 
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
          height="700"
          style={{
            display: 'block',
            width: '100%',
            backgroundColor: '#ffffff',
          }}
          title="Umami Shared Analytics Dashboard"
        />
      </div>
    </div>
  )
}
