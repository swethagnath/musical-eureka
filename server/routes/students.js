const express  = require('express')
const router   = express.Router()
const Student  = require('../models/Student')




router.post('/student', (req,res) => {

    const {name, branch, sid, semester} = req.body

    if(!name || !branch || !sid || !semester) {
        return res.status(400).json({errors: "fill all the fields" })
    } 
    
    Student.findOne({sid})
    .then(student => {
        if(student){
            return res.status(200).json({ success: true, err: "record exists" })
        }
        else{
            const student = new Student({name: (name.charAt(0).toUpperCase()+ name.slice(1)), branch:branch.toUpperCase(), sid, semester})
            student.save()
            .then(user => {
                if(user){
                    return res.status(200).json({ success: true, user })
                }else{
                    return res.status(400).json({err: "error found" })
                }
            })
        }
    })

})

router.get('/students', (req, res) => {

    Student.find()
    .then(students => {
        if(students){
            return res.status(200).json({ success: true, students })
        }else{
            return res.status(400).json({errors: "error found" })
        }
    })
    .catch(err => {
        return res.status(200).json({ success: true, err })
    })

})

router.get('/student/:id', (req, res) => {

    Student.findById(req.params.id)
    .then(student => {
        return res.status(200).json({ success: true, student })
    })
    .catch(err => {
        return res.status(200).json({ success: true, err })
    })
   
})

router.put('/student/:id', (req, res) => {

    const {name, branch, sid, semester} = req.body
    
    if(!name || !branch || !sid || !semester) {
        return res.status(400).json({err: "fill all the fields" })
    } 

    const editedName = name.charAt(0).toUpperCase() + name.slice(1)
    
    Student.findOne({sid})
        .then(student => {
            if(student){
                Student.findByIdAndUpdate(req.params.id, {name: editedName, branch: branch.toUpperCase(), sid, semester}, {new: true})
                .then(newstudent => {
                    return res.status(200).json({ success: true, newstudent })
                })
            }else{
                return res.status(200).json({ success: true,  err: "record dosent exist"})
            }
        })
        .catch(err => {
            return res.status(200).json({ success: true, err })
        })

})

router.delete('/student/:id', (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        return student.remove()
    })
    .then(student => {
        return res.status(200).json({ success: true, student })
    })
    .catch(err => {
        return res.status(200).json({ success: true, err })
    })
})

module.exports = router; 