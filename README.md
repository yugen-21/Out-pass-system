STUDENT DASHBOARD FOR OUT-PASS SYSTEM 

This student dashboard aims to create an intuitive UI and seamless backend connectivity for an out-pass management system for hostels using ReactJS, HTML, CSS for front-end and NodeJS with ExpressJS, MySQL database for backend. 

The features include:

User-friendly responsive navbar: 

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/acaa1c8f-e3c4-4d6b-913b-9b9932b9964a)


![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/60bc7eb8-d822-4409-bdc1-0da8e759996d)

Create out-pass:
Details of the student from MySQL database get auto-filled under the "Create Outpass" section.
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/cb8e487d-7004-4d95-98fa-017980c97d33)

Student must enter the details required for the out-pass registration.

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/c7d9912f-37c0-4427-ba1c-5384e34d26b9)

Date input:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/81ca5af7-8ac4-4738-921f-1b77df052ef4)


Upon clicking on "SUBMIT", a toastify notification is enabled.

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/94f6f9bb-3948-4e63-919b-b9c4d60bc523)

If the leave date and return date overlaps with already existing leave dates and return dates in the database, the data doesn't get submitted. Only a notification is enabled.
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/4549f0bc-4a8a-495f-8675-2bcea4670fbc)

Home page: 

An out-pass can be viewed only when the out-pass is approved.

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/a292e715-2bcc-4cf0-b358-caf3a901ecfb)

Once it is in-use, it can be extended.
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/ae5872dc-b91f-4cd3-8456-885bc7404b41)

MODALS USED:
A modal is a user interface component that overlays content on top of the main application, creating a "modal" or "pop-up" effect.


VIEW MODAL:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/c2133b7a-93ca-4434-b976-d81354740785)

EXTEND MODAL:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/eb157979-2a0f-436f-bf48-07f655e9a670)

CANCEL MODAL:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/63bba092-7619-4315-a610-98c1ee9cce54)

States of an out-pass:
There are 6 states to an out-pass:
1) Waiting: Once the out-pass is created by a student, it is in "Waiting" state and appears in the warden-side dashboard. In this state it cannot be viewed but cancelled/extended.
2) Approved: Once the out-pass is approved by the warden, it is in "Approved" state. In this state it cannot be extended. But it can be viewed/cancelled.
3) In-use: When the current-date is greater than or equal to leave-date mentioned by user, it is in use. In this state all operations can be performed.
4) Cancelled: An out-pass can be cancelled by a user, the status changes to "Cancelled".
5) Denied: When the warden "denies" the out-pass, it's status changes to "Denied".
6) Expired: When the out-pass is out of use, that is current date is greater than or equal to return date mentioned by user, it is "Expired".

View History:
Of which if the status of the out-pass is one of the last three, it appears under "View History" section.

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/896e8567-da99-47e1-9ccb-8582207ff901)

Warden details:

The details of the warden of that particular hostel number of the student is displayed under "Warden details".

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/3abece7f-a3b2-4d8f-b8ea-fa0fe946cf37)

Help:
The help section displays instructions for the user.

![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/a863071c-20af-434c-ab8f-3eda2060e972)

Other notifications enabled using toastify:

When the leave date > return date:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/d380fae6-77d4-48b4-9793-839b25a61567)

When the details are entered correctly, it enables a notification and it is redirected to home page:
![image](https://github.com/yugen-21/Out-pass-system-student-dashboard/assets/98334746/1e5f3d6a-63ef-4030-9fcd-733d7715cb73)



Conclusion: A user-friendly student dashboard was built using ReactJS, NodeJS and MySQL.This project demonstrates my commitment to creating user-centric solutions and streamlining administrative tasks, ultimately improving the overall hostel experience for students. With the powerful combination of modern web technologies and a focus on user needs, I believe this student dashboard sets a new standard for out-pass management systems.
