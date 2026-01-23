# Giải thích Quy trình & Kiến trúc Antigravity (Gemini Protocol)

> Tài liệu này giải thích chi tiết mối liên hệ giữa các quy tắc trong `GEMINI.md` và sơ đồ **Master Execution Pipeline** trong file `agent-architecture.drawio`.

---

## 🌟 Tóm tắt điều hành (Executive Summary)

**Gemini Protocol** không chỉ là một bộ quy tắc, mà là một **"Hệ điều hành tư duy"** dành cho AI Agent trong hệ thống Antigravity. Mục tiêu của nó là biến AI từ một công cụ thợ code (Junior Coder) thành một kỹ sư phần mềm thực thụ (Senior Engineer).

Hệ thống giải quyết 3 vấn đề cốt lõi của AI truyền thống:
1.  **Hấp tấp:** AI thường lao vào code ngay khi nhận lệnh. 👉 **Gemini dùng Socratic Gate để "Phanh lại", buộc AI phải dừng và hỏi làm rõ.**
2.  **Mù mờ:** AI thường không hiểu toàn bộ kiến trúc dự án, gây ra ảo giác. 👉 **Gemini dùng Skill Loading để "Nạp kiến thức" đúng lúc đúng chỗ, chỉ đọc những gì cần thiết.**
3.  **Cẩu thả:** AI thường sinh ra code chạy được nhưng khó bảo trì hoặc lỗi bảo mật. 👉 **Gemini dùng Final Checklist để "KCS" (Kiểm tra chất lượng) nghiêm ngặt trước khi bàn giao.**

Triết lý cốt lõi: **"Chậm mà chắc - Nghĩ trước làm sau"**.

---

## 1. Nguyên tắc cốt lõi: Cách AI tư duy (The Brain)

Trước khi thực hiện bất kỳ tác vụ nào, AI tuân thủ nghiêm ngặt các giao thức về định danh và nạp kiến thức.

### A. Định danh & Giao thức (Identity & Protocol)
*   **Nguyên tắc:** AI đóng vai trò là một **Senior Developer**, không làm việc máy móc. Quy trình bắt buộc là **"Đọc -> Hiểu -> Áp dụng"**.
*   **Skill Loading (Nạp kỹ năng theo module):** AI không đọc toàn bộ context. Nó chỉ đọc những module cần thiết cho task hiện tại để tránh nhiễu thông tin.
    *   **Dẫn chứng (File `GEMINI.md`):** Dòng 15-23: *"Agent activated → Check frontmatter... Read ONLY those section files"*.
    *   **Trên Sơ đồ:** Tương ứng với **Part 3: Skill Loading Protocol**. Luồng đi từ `Agent Activated` -> `Read agent.md` -> `Check skills list` -> `Load Skill`.

### B. Phân loại yêu cầu (Request Classifier)
*   **Nguyên tắc:** Mọi yêu cầu đều được phân loại để xác định mức độ phức tạp và rủi ro.
    *   **TIER 0:** Câu hỏi, Tra cứu (Question/Survey).
    *   **TIER 1:** Sửa code nhỏ, đơn giản (Simple Code).
    *   **TIER 2:** Xây dựng tính năng, tái cấu trúc, thiết kế (Complex Code/Design).
*   **Dẫn chứng (File `GEMINI.md` - Dòng 41-50):**

    > **Trích dẫn từ GEMINI.md:**
    >
    > | Request Type | Trigger Keywords | Active Tiers | Result |
    > |--------------|------------------|--------------|--------|
    > | **QUESTION** | "what is", "explain" | TIER 0 | Text Response |
    > | **SURVEY**   | "analyze", "list" | TIER 0 + Explorer | Session Intel |
    > | **SIMPLE CODE** | "fix", "add" (single) | TIER 0/1 | Inline Edit |
    > | **COMPLEX**  | "build", "refactor" | TIER 2 + Agent | **Must create PLAN** |
    > | **DESIGN**   | "design", "UI" | TIER 2 + Agent | **Must create PLAN** |
*   **Trên Sơ đồ:** Tương ứng với **Part 1** (bên trái cùng). Input `User Request` đi vào `REQUEST CLASSIFIER` và rẽ nhánh sang các Tier.

---

## 2. Dòng chảy công việc (The Master Execution Pipeline)

Đây là hành trình cụ thể của một yêu cầu **Complex Code (Tier 2)**, đi qua các chốt kiểm soát để đảm bảo chất lượng:

### Bước 1: Bộ lọc Socratic (Socratic Gate)
*   **Mục tiêu:** Ngăn chặn việc thực thi sai hướng hoặc thiếu thông tin. AI phải **STOP** và hỏi lại user.
    *   *New Feature:* Hỏi 3 câu chiến lược.
    *   *Vague:* Hỏi về mục đích, người dùng.
*   **Dẫn chứng (File `GEMINI.md` - Dòng 131-143):**

    > **Trích dẫn từ GEMINI.md:**
    >
    > | Request Type | Strategy | Required Action |
    > |--------------|----------|-----------------|
    > | **New Feature** | Deep Discovery | ASK min 3 strategic Qs |
    > | **Bug Fix** | Context Check | Confirm + Ask impact |
    > | **Vague** | Clarification | Ask Purpose, Users, Scope |
    > | **Orchestrate** | Gatekeeper | **STOP** until confirmed |
    > | **Direct Proceed** | Validation | **STOP** + Ask Edge Cases |
*   **Trên Sơ đồ:** **Part 2: Socratic Gate Flow**. Hình thoi đỏ 🛑 `SOCRATIC GATE` chặn mọi yêu cầu. Chỉ khi có ✅ `Gate Cleared`, dòng chảy mới tiếp tục.

### Bước 2: Thực thi 4 Pha (Plan Mode 4-Phase)
*   **Mục tiêu:** Đảm bảo code được viết ra đã có thiết kế và kế hoạch rõ ràng.
*   **Quy trình 4 Pha:**
    1.  **Analysis:** Nghiên cứu, hỏi thêm câu hỏi.
    2.  **Planning:** Tạo file `docs/PLAN-{task}.md`.
    3.  **Solutioning:** Thiết kế kiến trúc, luồng dữ liệu (chưa code).
    4.  **Implementation:** Viết code và test.
*   **Dẫn chứng (File `GEMINI.md`):** Dòng 194-200. Quy tắc tuyệt đối: *"NO CODE before Phase 4!"*.
*   **Trên Sơ đồ:** **Part 4: Plan Mode 4-Phase**. Thể hiện 4 khối chữ nhật nối tiếp nhau.

### Bước 3: Kiểm tra cuối cùng (Final Checklist Protocol)
*   **Mục tiêu:** Đảm bảo chất lượng đầu ra trước khi bàn giao (Production Ready).
*   **Quy trình:** Chạy tuần tự các script kiểm tra.
    1.  `security_scan.py` (Bảo mật)
    2.  `lint_runner.py` (Cú pháp)
    3.  `schema_validator.py` (CSDL)
    4.  `test_runner.py` (Logic)
    5.  `ux_audit.py` (Giao diện)
    6.  `seo_checker.py` (SEO)
    7.  `lighthouse_audit.py` (Hiệu năng)
*   **Dẫn chứng (File `GEMINI.md`):** Dòng 151-162: *"Priority Execution Order: Security → Lint..."*.
*   **Trên Sơ đồ:** **Part 5: Final Checklist Protocol**. Chuỗi các hộp kiểm tra ở cuối quy trình. Nếu tất cả Pass, task mới được coi là hoàn thành (Done).

---

### Tóm tắt trực quan

Mô hình này tạo ra một hệ thống "Check & Balance" (Kiểm soát và Cân bằng):

> **Input** ➡️ **Phân loại** ➡️ 🛑 **Cổng Socratic** (Chặn/Hỏi) ➡️ 🧠 **Nạp Kỹ Năng** ➡️ ⚙️ **Thực thi 4 Pha** ➡️ ✅ **Checklist** ➡️ **Output**

Bạn có thể mở file `drawio/agent-architecture.drawio` trong thư mục này để xem sơ đồ trực quan.
