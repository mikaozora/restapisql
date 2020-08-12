// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const md5 = require("md5")
const moment = require("moment")
const { json, response } = require("express")
const { error } = require("console")
const { EROFS } = require("constants")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "penyewaan_mobil"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})
// CRUD tabel mobil
app.get("/mobil", (req, res) => {
    // sql
    let sql = "select * from mobil"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.get("/mobil/:id", (req, res) => {
    let data = {
        id_mobil: req.params.id
    }
    // sql
    let sql = "select * from mobil where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.post("/mobil", (req, res) => {
    let data = {
        id_mobil: req.body.id_mobil,
        nomor_mobil: req.body.nomor_mobil,
        merk: req.body.merk,
        jenis: req.body.jenis,
        warna: req.body.warna,
        tahun_pembuatan: req.body.tahun_pembuatan,
        biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
        image: req.body.image
    }
    let sql = "insert into mobil set ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})
app.put("/mobil", (req, res) => {
    let data = [
        {
            nomor_mobil: req.body.nomor_mobil,
            merk: req.body.merk,
            jenis: req.body.jenis,
            warna: req.body.warna,
            tahun_pembuatan: req.body.tahun_pembuatan,
            biaya_sewa_per_hari: req.body.biaya_sewa_per_hari,
            image: req.body.image
        },
        {
            id_mobil: req.body.id_mobil
        }
    ]
    let sql = "update mobil set ? where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})
app.delete("/mobil/:id", (req, res) => {
    let data = {
        id_mobil: req.params.id
    }
    let sql = "delete from mobil where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})
// CRUD tabel pelanggan
app.get("/pelanggan", (req, res) => {
    // sql
    let sql = "select * from pelanggan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.get("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    // sql
    let sql = "select * from pelanggan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.post("/pelanggan", (req, res) => {
    let data = {
        id_pelanggan: req.body.id_pelanggan,
        nama_pelanggan: req.body.nama_pelanggan,
        alamat_pelanggan: req.body.alamat_pelanggan,
        kontak: req.body.kontak
    }
    let sql = "insert into pelanggan set ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})
app.put("/pelanggan", (req, res) => {
    let data = [
        {
            nama_pelanggan: req.body.nama_pelanggan,
            alamat_pelanggan: req.body.alamat_pelanggan,
            kontak: req.body, kontak
        },
        {
            id_pelanggan: req.body.id_pelanggan
        }
    ]
    let sql = "update pelanggan set ? where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})
app.delete("/pelanggan/:id", (req, res) => {
    let data = {
        id_pelanggan: req.params.id
    }
    let sql = "delete from pelanggan where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})
// CRUD tabel karyawan
app.get("/karyawan", (req, res) => {
    // sql
    let sql = "select * from karyawan"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.get("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }
    // sql
    let sql = "select * from karyawan where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.post("/karyawan", (req, res) => {
    let data = {
        id_karyawan: req.body.id_karyawan,
        nama_karyawan: req.body.nama_karyawan,
        alamat_karyawan: req.body.alamat_karyawan,
        kontak: req.body.kontak,
        username: req.body.username,
        password: md5(req.body.password)
    }
    let sql = "insert into karyawan set ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})
app.put("/karyawan", (req, res) => {
    let data = [
        {
            nama_karyawan: req.body.id_karyawan,
            alamat_karyawan: req.body.alamat_karyawan,
            kontak: req.body.kontak,
            username: req.body.username,
            password: md5(req.body.password)
        },
        {
            id_karyawan: req.body.id_karyawan
        }
    ]
    let sql = "update karyawan set ? where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})
app.delete("/karyawan/:id", (req, res) => {
    let data = {
        id_karyawan: req.params.id
    }
    let sql = "delete from karyawan where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})
app.post("/sewa", (req, res) => {
    // inisialisasi data
    let shari = req.body.shari // pelanggan menginpukan berapa lama dia menyewa
    let tglk = moment().add(shari, 'days').format('YYYY-MM-DD')
    let tgls = moment().format('YYYY-MM-DD')
    let data1 = {
        id_mobil: req.body.id_mobil
    }

    // buat sql
    let sql = "select biaya_sewa_per_hari from mobil where ?"
    db.query(sql, data1, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let biaya = result[0].biaya_sewa_per_hari
            let total = biaya * shari // harga dikali dengan berapa lama menyewa
            let data2 = {
                id_sewa: req.body.id_sewa,
                id_mobil: data1.id_mobil,
                id_pelanggan: req.body.id_pelanggan,
                id_karyawan: req.body.id_karyawan,
                tgl_sewa: tgls,
                tgl_kembali: tglk,
                total_bayar: total
            }
            let sql = "insert into sewa set ?"
            db.query(sql, data2, (error, result) => {
                if (error) {
                    res.json({ message: error.message })
                } else {
                    res.json({ message: "Data berhasil ditambahkan" })
                }
            })
        }
    })
})
app.get("/sewa", (req, res) => {
    // buat sql
    let sql = "select s.id_sewa, m.id_mobil, m.merk, k.id_karyawan, k.nama_karyawan, p.id_pelanggan, p.nama_pelanggan, s.tgl_sewa, s.tgl_kembali, s.total_bayar " +
        "from sewa s join mobil m on s.id_mobil = m.id_mobil " +
        "join karyawan k on s.id_karyawan = k.id_karyawan " +
        "join pelanggan p on s.id_pelanggan = p.id_pelanggan"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.get("/sewa/:id", (req, res) => {
    let data = {
        id_sewa: req.params.id
    }
    let sql = "select s.id_sewa, m.id_mobil, m.merk, k.id_karyawan, k.nama_karyawan, p.id_pelanggan, p.nama_pelanggan, s.tgl_sewa, s.tgl_kembali, s.total_bayar " +
        "from sewa s join mobil m on s.id_mobil = m.id_mobil " +
        "join karyawan k on s.id_karyawan = k.id_karyawan " +
        "join pelanggan p on s.id_pelanggan = p.id_pelanggan where ?"
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})
app.put("/sewa", (req, res) => {
    let shari = req.body.shari // pelanggan menginpukan berapa lama dia menyewa
    let tglk = moment().add(shari, 'days').format('YYYY-MM-DD')
    let tgls = moment().format('YYYY-MM-DD')
    let data1 = {
        id_mobil: req.body.id_mobil
    }
    let sql = "select biaya_sewa_per_hari from mobil where ?"
    db.query(sql, data1, (error, result) => {
        if (error) {
            res.json({ message: error.message })
        } else {
            let biaya = result[0].biaya_sewa_per_hari
            let total = biaya * shari
            let data = [
                {
                    tgl_sewa: tgls,
                    tgl_kembali: tglk,
                    total_bayar: total
                },
                {
                    id_sewa: req.body.id_sewa
                }]
            let sql = "update sewa set ? where ?"
            db.query(sql, data, (error, result) => {
                if(error){
                    res.json({message : error.message})
                }else{
                    res.json({message : "Data berhasil diupdate"})
                }
            })
        }
    })
})
app.delete("/sewa/:id", (req, res) => {
    let data = {
        id_sewa : req.params.id
    }
    let sql = "delete from sewa where ?"
    db.query(sql, data, (error, result) => {
        if(error){
            res.json({message : error.message})
        }else{
            res.json({message : "Data berhasil dihapus"})
        }
    })
})
app.listen(8000, () => {
    console.log("Run on port 8000")
})