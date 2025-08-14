* <span style="color: rgb(55, 65, 81)">The "Trade Partner" feature is designed to streamline the management of business relationships by providing a comprehensive system for handling trade partner information.</span>
* This feature includes functionalities for creating, reading, updating, and deleting trade partner records, as well as importing and exporting data to facilitate efficient data management.

# Details of main components

* **CRUD (Create, Read, Update, Delete):**
  * 3 fields: <span style="color: rgb(41, 42, 46)">Trade Partner Code, Trade Partner Name, Setting Display(0 or 1)</span>
  * Validation

* **Import:**
  * Error handling
    * Error before import
      * File error: over 10MB,...
      * File content error: empty file, <span style="color: rgb(41, 42, 46)">file exists only header row,....</span>
    * Error after import
      * Validation each fields: <span style="color: rgb(41, 42, 46)">code is larger than 20 characters,....</span>
  * Behavior related to button 'stop' during import and 'x' in modal or fail toast
    * Stop during import -> can stop or not depending BE
    * Close 'x' in fail toast -> show error modal


* **Export:**
  * Data export process and file format.
    * Export with all
    * Export with searched results

<img src='/attachments/a0f36748-ffc8-4939-b379-f39a7da92c29' title='Screenshot 2025-07-18 at 11.23.00.png' alt='Screenshot 2025-07-18 at 11.23.00' width='1168' data-meta='{"width":1168,"height":706}'>

* **Permission:**
  * Permissions are configured on a separate page from LA
    * none -> <span style="color: rgb(41, 42, 46)">Menu Trade partner is hidden</span>
    * can read(this user can export)
    * can read, create/edit (this user can import)
    * can read, create/edit, delete
  * Changes are reflected in real-time across the system, ensuring permissions are applied correctly and consistently
  * All buttons can be enabled or disabled based on configured page from LA