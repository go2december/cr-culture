import React from 'react'
import Image from 'next/image'

export const Logo = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* คุณสามารถเปลี่ยนรูปร่างหน้าตา หรือใส่ SVG จริงๆ ขององค์กรลงที่นี่ได้ครับ */}
            <div style={{
                background: 'linear-gradient(135deg, #6B21A8, #D4AF37)',
                color: 'white',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}>
                CR
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6B21A8', letterSpacing: '0.05em' }}>
                ระบบจัดการสภาวัฒนธรรม
            </span>
        </div>
    )
}

export default Logo
