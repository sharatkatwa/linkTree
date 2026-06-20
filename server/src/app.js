import cookieParser from "cookie-parser";
import e from "express";
import morgan from "morgan";

const app = e()

app.use(e.json())
app.use(cookieParser())

app.use(morgan())

app.use('/health', ()=>{
    res.status(200).json({message: 'api is in good condition'})
})

export default app