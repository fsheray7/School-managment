# Codebase Structure

### 1. Dedicated `shared/` or `ui/` Directory

Move universal components that don't depend on specific school data into a shared layer.

- `src/components/ui/`: Button, Modal, DataTable, DataCard, Input, Loader.
- `src/components/common/`: Navbar, Sidebar, Footer (reusable across roles).

### 2. Feature-based Organization

Instead of sorting everything by role, consider grouping by **Feature**. This makes it much easier to find everything related to a specific part of the system.

- `src/features/students/`: Components, hooks, and services specific to student management.
- `src/features/teachers/`: Logic/components for teacher management.
- `src/features/courses/`: Everything course-related.

### 3. Logic & Utilities

Create folders for cross-cutting concerns:

- `src/hooks/`: Custom React hooks (e.g., `useForm`, `usePagination`).
- `src/utils/`: Pure helper functions (e.g., `formatDate`, `validationUtils`).
- `src/constants/`: Configuration and static data (e.g., role types, API endpoints).

### 4. Layout Layer

Strengthen the `layout/` folder to handle base wrappers for Admin, Student, and Teacher dashboards to avoid repetitive wrapping in every page.

---

## Folder Map

```text
src/
├── assets/          # Images, icons, static files
├── components/      # UI components
│   ├── ui/          # Generic components (Buttons, Inputs, etc.)
│   └── layout/      # Shared layout components (Navbar, Sidebar)
├── features/        # Business logic & domain components
│   ├── admin/       # Components unique to Admin
│   ├── students/    # Components unique to Students
│   └── teachers/    # Components unique to Teachers
├── pages/           # Page entry points (routing only)
│   ├── admin/       # Admin routes
│   ├── student/     # Student routes
│   └── teacher/     # Teacher routes
├── hooks/           # Shared custom hooks
├── data/            # Mock data (or move to features/shared)
├── context/         # React Context/State management
├── utils/           # Helper functions
└── App.jsx          # Main routing & configuration
```