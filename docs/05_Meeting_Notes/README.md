# Meeting Notes

## Purpose
โฟลเดอร์นี้ใช้เก็บบันทึกการประชุม บันทึกการคุยกับทีม บันทึก session การทำงาน และ action items ที่เกิดขึ้นระหว่างการพัฒนาโปรเจกต์

## Structure
- `README.md` — สารบัญและวิธีใช้งาน
- `Decision_Log.md` — สารบัญการตัดสินใจเชิงระบบ/เชิงเทคนิค
- `Sessions/` — บันทึกการประชุมหรือ working session รายครั้ง
- `Archive/` — เก็บบันทึกเก่าที่ไม่ active แล้ว

## Naming Convention
แนะนำให้ตั้งชื่อไฟล์ใน `Sessions/` แบบ:
- `YYYY-MM-DD_<topic>.md`

ตัวอย่าง:
- `2026-04-16_obsidian-docs-setup.md`
- `2026-04-20_payload-query-refactor.md`

## When to Create a Meeting Note
สร้าง note เมื่อมี:
- การประชุมสรุป scope หรือ requirements
- การตัดสินใจร่วมกันที่มี action items
- การ debug session ที่มีข้อสรุปสำคัญ
- การวางแผนงานหลายขั้นตอน

## What to Put in a Meeting Note
- วันที่
- ผู้เข้าร่วม
- บริบท / เหตุผลของการคุย
- สรุปที่ตกลงกัน
- action items
- links ไปยัง feature docs / schema docs / code files ที่เกี่ยวข้อง

## Decision vs Meeting Note
- ถ้าเป็น “บันทึกเหตุการณ์/การคุย” ให้เก็บใน `Sessions/`
- ถ้าเป็น “ข้อสรุปเชิงนโยบาย/สถาปัตยกรรม/แนวทางถาวร” ให้เพิ่มลง `Decision_Log.md`

## Related Templates
- `../99_Templates/Meeting_Note_Template.md`
- `../99_Templates/Decision_Log_Entry_Template.md`
