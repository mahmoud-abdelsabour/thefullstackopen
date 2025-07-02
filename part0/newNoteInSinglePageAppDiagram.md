```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a new note and submits the form

    Note right of browser: Save button clicked
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: 201 created
    deactivate server

```