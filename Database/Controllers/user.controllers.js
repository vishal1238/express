export const home = (req, res) => {
    res.send("Hello")
}

export const create = async(req, res) => {
    try {
        let {name,age,email,userName} = req.body
        const newuser = await User.create({
            name,
            age,
            email,
            userName
        })
        res.status(201).json({message: "User Created", user: newuser})
    } catch (error) {
        res.status(400).json({message: "error"})
    }
}
