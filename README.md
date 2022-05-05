### CIS 215

#### Goals:
    1. Analyze a business problem and develop data management requirements.
    2. Develop a conceptual model to meet the problem requirements, using an Entity-Relationship diagram.
    3. Apply normalization to reduce/eliminate redundancy in database design.
    4. Implement the conceptual model in a commercial relational database (SQLite).

#### You are required to develop a financial industry web application that allows employees to:
    ✔ 1. Require teller to log in to use. 
    ✔ 2. Open accounts for new members
       ✔ a. Gather all appropriate member data (SSN, name, DOB, etc.)
       ✔ b. Simulate a scan of tentative member to ensure credit worthiness
       ✔ c. Allow joint members &/or beneficiaries
       ✔ d. Auto-generate an incremented account number
    ✔ 3. Allow members to have unlimited, multiple shares under their account 
        (savings, checking, loans, CDs, IRAs, etc.).
    ✔ 4. Shares should have unique codes. (01-09 for savings, 20-29 for checking, etc.)
    ✔ 5. Ability to scan and upload images of ID, paperwork, etc. (Glob)
    ✔ 6. Create the deposit/transfer/withdrawal interface for tellers. 
        ✔ ..Must do cash & checks differently. 
        ✔ ..(Use codes like CR [cash received] KR [check received] SD [share deposit] etc.). 
        ✔ ..Must be able to chain codes.
    ✔ 7. Print receipt of transaction.
    ! 8. Ability to print money orders & cashier's checks.
    ! 9. Loan payment processing.
    ✔ 10. Statement generation & printing.
    ! 11. Ability to assess fees for certain transactions.

#### Deliverables:
    * 1. Fully developed web application with a SQLite database
    ✔ 2. Input validation & sanitization (both on the front-end, and in the database)
    ✔ 3. Error checking (no negative balances, etc.
    * 4. Secured database and vacuumed regularly
    ✔ 5. Backup & restore strategy
    ✔ 6. ERD for everything
    ✔ 7. Proper relationships, primary & foreign keys, triggers, and common table expressions
    ✔ 8. Ability to generate reports and export to Excel for graphing
    ✔ 9. All tables should follow normalization rules & be highly cohesive
    * 10. Proper use of SQLite data types
    11. BONUS points if you make it a fully functioning progressive web app (PWA)
