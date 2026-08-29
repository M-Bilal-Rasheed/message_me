export async function checkAuth(req, res , next) {
    // Implementation for checking authentication
    if(!req.user){
        res.status(401).json({error:"Unauthorized"})
        return
    }
    res.status(200).json(req.user)
}