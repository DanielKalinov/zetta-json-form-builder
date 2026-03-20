# Dynamic Form Builder (ZETTA Assignment)

A React Single Page Application (SPA) that renders complex, interactive forms dynamically based on a JSON schema.

## 📌 Project Management

[GitHub Project Board](https://github.com/users/DanielKalinov/projects/3)

---

## ⚙️ Installation & Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Running the project
```bash
npm run dev
```
Then open the application in your browser (typically):
```bash
http://localhost:5173
```

### 3. Running Tests
This project uses Vitest and React Testing Library.
```bash
npm run test
```

---

## 🚀 Key Features

* **Real-time Rendering**: An input field at the top allows users to paste a JSON structure; the form re-renders instantly upon change. 
* **Nested Group Support**: Recursive rendering of form groups with visual encapsulation to distinguish hierarchy.
* **Dynamic Visibility**: Show or hide fields or groups based on the values of other fields (e.g., choosing "BUSINESS" reveals company-specific fields).
* **Mock API Integration**: Automatic data fetching and field auto-filling triggered by specific field combinations.
* **Structured Output**: Submitting the form generates a JSON object maintaining the original field relationships and hierarchy.

---

## 🛠 Tech Stack

* **Core**: React (Functional Components & Hooks)
* **Form Management**: React Hook Form
* **UI Framework**: MUI
* **Testing**: Vitest & React Testing Library

---

## 📋 JSON Schema Definition

The application expects a JSON structure with the following field types: `text`, `textarea`, `dropdown`, `checkbox`, `radio`, and `group`.

<br>

### 1. Standard Inputs and Standard Validations
Use this configuration to set up basic form fields such as text boxes, large text areas, and selection menus. This example also shows how to enforce data integrity by applying specific validation rules—like mandatory requirements or character limits—to your inputs.

```json
[
  {
    "type": "text",
    "name": "username",
    "label": "Username",
    "validations": {
      "required": "Username is required",
      "minLength": {
        "value": 3,
        "message": "Username must be at least 3 characters long"
      }
    }
  },
  {
    "type": "textarea",
    "name": "bio",
    "label": "Biography",
    "validations": {
      "maxLength": {
        "value": 200,
        "message": "Biography must be no more than 200 characters long"
      }
    }
  },
  {
    "type": "dropdown",
    "name": "role",
    "label": "User Role",
    "options": [
      { "value": "admin", "label": "Administrator" },
      { "value": "editor", "label": "Editor" }
    ]
  }
]
```
<br>

### 2. Interactive Selection (Radio & Checkbox)
This example highlights the support for boolean and multiple-choice inputs. It allows you to present users with explicit choices that can trigger further form logic or simple binary confirmations.

```json
[
  {
    "type": "radio",
    "name": "contactPreference",
    "label": "Preferred Contact Method",
    "options": [
      { "value": "email", "label": "Email" },
      { "value": "phone", "label": "Phone" }
    ],
    "validations": { "required": "Please select a preference" }
  },
  {
    "type": "checkbox",
    "name": "terms",
    "label": "I accept the terms and conditions",
    "validations": { "required": "You must accept the terms" }
  }
]
```
<br>

### 3. Organizing Data with Nested Groups
For complex forms, you can organize related information into visually encapsulated sections. When the form is submitted, the application preserves this structure, providing you with a nested JSON object that reflects the layout hierarchy (e.g., nesting street and city within an "address" object).

```json
[
  {
    "type": "group",
    "name": "address",
    "label": "Shipping Address",
    "fields": [
      {
        "type": "text",
        "name": "street",
        "label": "Street Name"
      },
      {
        "type": "text",
        "name": "city",
        "label": "City"
      }
    ]
  }
]
```
<br>

### 4. Creating Interactive Flows (Dynamic Visibility)
You can build interactive user experiences by showing or hiding entire sections based on the values entered in other fields. This allows you to keep the form clean by only presenting relevant fields, such as displaying company-specific questions only when "Business" is selected as the customer type.

```json
[
  {
    "type": "radio",
    "name": "customerType",
    "label": "Customer Type",
    "options": [
      { "value": "INDIVIDUAL", "label": "Individual" },
      { "value": "BUSINESS", "label": "Business" }
    ]
  },
  {
    "type": "group",
    "name": "businessDetails",
    "label": "Company Information",
    "condition": {
      "watch": "customerType",
      "is": "BUSINESS"
    },
    "fields": [
      {
        "type": "text",
        "name": "taxId",
        "label": "VAT Number"
      }
    ]
  }
]
```
<br>

### 5. API Data Integration (Auto-fill)
To improve efficiency, you can configure fields to auto-populate using data from an external API. By defining specific "trigger" fields, the form will automatically execute a background request as soon as those values are present, retrieving and inserting information without manual typing.

```json
[
  {
    "type": "text",
    "name": "city",
    "label": "City",
    "apiConfig": {
      "endpoint": "/api/geo/cities",
      "triggers": ["x", "y"]
    }
  },
  {
    "type": "text",
    "name": "x",
    "label": "Position X",
    "validations": {
        "validate": ["onlyNumbers"]
    }
  },
  {
    "type": "text",
    "name": "y",
    "label": "Position Y",
    "validations": {
        "validate": ["onlyNumbers"]
    }
  }
]
```

#### Available Endpoints:

##### Geo

| Endpoint              | Description        |
|----------------------|------------------|
| `/api/geo/cities`    | Random city       |
| `/api/geo/countries` | Random country    |
| `/api/geo/state`     | Random state      |
| `/api/geo/zipcode`   | Random zipcode    |

##### Person

| Endpoint                 | Description        |
|--------------------------|------------------|
| `/api/person/name`       | Full name         |
| `/api/person/email`      | Email address     |
| `/api/person/phone`      | Phone number      |
| `/api/person/jobTitle`   | Job title         |

##### Company

| Endpoint                   | Description        |
|----------------------------|------------------|
| `/api/company/name`        | Company name      |
| `/api/company/catchPhrase` | Company slogan    |

##### Address

| Endpoint                    | Description              |
|-----------------------------|------------------------|
| `/api/address/street`       | Street address          |
| `/api/address/fullAddress`  | Full address (street + city) |

##### Internet

| Endpoint                   | Description        |
|----------------------------|------------------|
| `/api/internet/username`   | Username          |
| `/api/internet/url`        | URL               |
<br>

### 6. Custom Validations & Data Integrity
Beyond standard attributes like `required`, `maxLength` and `minLength`, the form builder supports a suite of specialized rules to enforce strict data formats. These are particularly useful for fields requiring specific patterns, such as numeric-only IDs or specialized text formats.
<br>
<br>
To apply these, include a `validate` array within the `validations` object of your JSON. The engine will automatically map these strings to the corresponding logic in the application.
<br>
```json
[
  {
    "type": "text",
    "name": "postalCode",
    "label": "Postal Code",
    "validations": {
      "validate": ["onlyNumbers", "minLength5"]
    }
  }
]
```

#### Available Custom Rules:
| Rule Key              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| onlyNumbers          | Restricts input to numeric characters only (0-9).                           |
| onlyLetters          | Restricts input to alphabetical characters only.                            |
| noSpaces             | Disallows any whitespace within the field.                                  |
| noConsecutiveSpaces  | Prevents users from entering more than one space in a row.                  |
| startsWithCapital    | Ensures the first character is an uppercase letter.                         |
| emailFormat          | Validates that the input follows a standard email structure.                |
| containsNumber       | Requires the input to include at least one digit.                           |
| containsSpecialChar  | Requires at least one special character (e.g., !, @, #).                    |
| minLength5           | Enforces a minimum length of at least 5 characters.                         |
| maxLength20          | Caps the input at a maximum of 20 characters.                               |

---

