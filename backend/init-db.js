(async() => {
  try {
    const sqlite = require('sqlite')
    const Promise = require('bluebird')
    let db = await sqlite.open('sqlite_db', { Promise })

    await db.run(`
      CREATE TABLE jurisdictions (
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
    );`)
    await db.run(`
      INSERT INTO jurisdictions
      VALUES (
        null,
        'JUR359D88F9B71718E7F4A6',
        'cass',
        'Cour de cassation',
        '5 Quai de l''Horloge',
        '75055',
        'PARIS CEDEX 01',
        '0144329595',
        null,
        null,
        'https://www.courdecassation.fr'
    );`)
    await db.run(`
      INSERT INTO jurisdictions
      VALUES (
        null,
        'JUR64FE952E9CA370DAC630',
        'ce',
        'Conseil d''État',
        '1 Place du Palais Royal',
        '75001',
        'PARIS',
        '0140208000',
        null,
        null,
        'http://www.conseil-etat.fr/'
    );`)
    await db.run(`
      CREATE TABLE jurisdictions_verified_contact_infos (
      id INTEGER PRIMARY KEY,
      jurisdiction_id TEXT NOT NULL,
      type TEXT NOT NULL,
      data TEXT NOT NULL
    );`)
    await db.run(`
      INSERT INTO jurisdictions_verified_contact_infos
      VALUES (
        null,
        'JUR359D88F9B71718E7F4A6',
        'email',
        'biblio.courdecassation@justice.fr'
    );`)
    await db.run(`
      INSERT INTO jurisdictions_verified_contact_infos
      VALUES (
        null,
        'JUR359D88F9B71718E7F4A6',
        'telephone',
        '0144329595'
    );`)
    await db.run(`
      INSERT INTO jurisdictions_verified_contact_infos
      VALUES (
        null,
        'JUR359D88F9B71718E7F4A6',
        'telephone',
        '0685545714'
    );`)
    await db.run(`
      INSERT INTO jurisdictions_verified_contact_infos
      VALUES (
        null,
        'JUR64FE952E9CA370DAC630',
        'email',
        'diffusion-jurisprudence@conseil-etat.fr'
    );`)
    await db.run(`
      CREATE TABLE decisions (
        doc_id TEXT NOT NULL PRIMARY KEY,
        title TEXT NOT NULL,
        formation TEXT,
        president TEXT,
        gl_lawyer TEXT,
        lawyers TEXT,
        rapporteur TEXT,
        jp_quotation TEXT,
        ana_summary TEXT,
        principal_sct_summary TEXT,
        reference_sct_summary TEXT,
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
        rec_type TEXT,
        compilation_publi TEXT
    );`)
    db.close()

  } catch (error) {
    console.error(error)
  }
})()
