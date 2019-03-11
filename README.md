# Doctrine Backend skills test

Purpose of this test is to evaluate your ability to produce a good backend code while discovering a few aspects of development at Doctrine. That's why we provide you a small base to start with, such as a db, a server, and a homepage and some jurisdictions pages.

## Setup
  - Install `sqlite`:
    - On Ubuntu linux:
      `sudo apt-get install sqlite`
    - On Mac OsX:
      `brew install sqlite`
    More infos on https://www.sqlite.org/cli.html
  - Run `bash init-project.sh`
  - You can now run the backend with `bash start-back.sh` and go to http://localhost:8080
  - You can now run the frontend with `bash start-front.sh` and go to http://localhost:3000

## Guidelines
  - Code must be in Node.js.
  - Time to finish this test is not limited.
  - You must prevent server from sending 500 errors. Error cases should be correctly handled.
  - Feel free to create or modify any table in the sqlite database. However, we won't test your work with your database so you need to provide a script to modify our own accordingly or to update the installation script.
  - Everything you make should be tested with the test suite of your choice.
  - You can add anything you want to improve your final work. A lot of extra things can be done, like cleaning the decisions pages HTML for example. Any extra work will be evaluated as bonuses. Be aware that this extra work should follow the same guidelines as the rest of your code. If it makes the server crash sometimes, it will be penalized. Be creative !
  - Pages loading should be as fast as possible.
  - Frontend will not be evaluated. But you can still impress us.
  - In any case the install instructions in this README file should always be valid. You can update this file if necessary if the install and running instructions have changed.

## Objectives

#### 1st Objective: we want to display contact informations on a jurisdiction page.

We have some informations which are sourced from jurisdictions websites. They can be found on `jurisdiction` table. We also have verified ones which we know for sure to be correct. You can find it on `jurisdictions_verified_contact_infos` table. So for each contact information type, we want to display all the distinct items we have and if this info is verified or not.

The endpoint is already present and you can code what you need to achieve this purpose in `controllers/getJurisdictionContactInfos`.

The return object for API should look like that :
```
"jurisdiction_contact_infos":  {
   "telephone": [
   {
     "data": "0111111111",
     "verified":true
    },
    {
      "data":"0222222222",
      "verified":false
    }],
    "email": [
    {
      "data":"email@email.com",
      "verified":true
    }],
    "fax":[],
}
```

#### 2nd Objective: we want to display a list of decisions on a jurisdiction page.

The table `decisions` contains decisions from "Cour de cassation".
On "Cour de cassation" page, we want to display 10 decisions. They must be with `formation` = "CHAMBRE_CRIMINELLE", `solution` that includes "cassation", and `dec_date` after 1980/01/01. We want them ordered by `dec_date`, from the closest to the oldest.

We want to display at least the title of the decisions.

#### 3rd Objective: we want to have decisions pages.

On the model of jurisdiction pages, we want decisions pages. Every item of the decisions list on the `Cour de cassation` page should link to these pages.
Every page should display at least decision title and decision content.

## SQL tables list
  ```
  decisions (
    doc_id TEXT NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    formation TEXT,
    president TEXT,
    gl_lawyer TEXT,
    lawyers TEXT,
    jp_quotation TEXT,
    ana_summary TEXT,
    links TEXT,
    number TEXT,
    case_number TEXT,
    solution TEXT,
    dec_date DATE NOT NULL,
    att_dec_date DATE,
    html_content TEXT,
    jurisdiction TEXT NOT NULL,
    publi_bull INTEGER,
    ecli TEXT,
    gvt_commissary TEXT,
    rec_type TEXT
)
```

```
jurisdictions (
id INTEGER PRIMARY KEY,
jurisdiction_id TEXT NOT NULL,
pivot_local TEXT,
name TEXT,
address TEXT,
postal_code TEXT,
commune_name TEXT,
telephone TEXT,
fax TEXT,
email TEXT,
website TEXT
)
```

```
jurisdictions_verified_contact_infos (
id INTEGER PRIMARY KEY,
jurisdiction_id TEXT NOT NULL,
type TEXT NOT NULL,
data TEXT NOT NULL
)
```
