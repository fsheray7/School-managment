# TODO: Redesign AddMarks Page and Results Page

## AddMarks Page
- [x] Import CustomDropdown and DataTable components in AddMarks.jsx
- [x] Add terminal dropdown to TeacherSelector as first dropdown
- [x] Remove the two terminal cards (First and Second)
- [x] Refactor the student marks table to use DataTable with columns: Roll No, Student Name, Obtained Marks (with input field)
- [x] Ensure useEffect for loading marks includes terminal in dependencies
- [x] Update handleSaveMarks to use the selected terminal
- [x] Test the dropdown functionality, table updates, and save feature
- [x] Ensure responsive design and reuse of components
- [x] Add auto-generated grades and status columns based on obtained marks
- [x] Implement grade calculation: A (90%+), B (80-89%), C (70-79%), D (60-69%), F (<60%)
- [x] Implement status calculation: Pass (40%+), Fail (<40%)
- [x] Update mobile card view to show grade and status
- [x] Add dynamic toast message on save with subject and terminal information
- [x] Add validation to prevent saving without marks input
- [x] Add confirmation modal with OK/Cancel buttons before saving marks
- [x] Add custom event dispatch to notify Results page of data updates

## Results Page
- [x] Replace terminal cards with dynamic student results table
- [x] Use DataTable component for reusability and clean code
- [x] Display columns: Roll No, Student Name, Subject, First Terminal (Marks/Grade/Status), Second Terminal (Marks/Grade/Status)
- [x] Fetch marks data from marksManager utility
- [x] Update marksManager to save grade information
- [x] Ensure responsive design with mobile card view
- [x] Maintain clean and minimal code structure
- [x] Display saved marks from AddMarks page automatically
- [x] Add event listener for real-time data synchronization with AddMarks page
- [x] Fix terminal string mismatch: Change "First" to "First Terminal" and "Second" to "Second Terminal" in find operations to match saved data
