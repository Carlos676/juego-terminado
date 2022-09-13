//libreria para recibir y responder las peticiones
const express=require("express")

const cors=require("cors")
//una instancoa del servidor
const app = express()
//con habilitan los json

app.use(cors())
app.use(express.json())
//para el juego
const jugadores= []

class Jugador{
    constructor(id){
        this.id=id
    }
    asignarMokepon(mokepon){
        this.mokepon=mokepon
    }
    actualizarPosicion(x,y){
        this.x=x
        this.y=y
    }
    asignarAtaques(ataques){
        this.ataques=ataques
    }
}
class Mokepon{
    constructor(nombre){
        this.nombre=nombre
    }
}


//asemos una peticion
app.get("/unirse",(req,res)=>{
    const id= `${Math.random()}`

    const jugador=new Jugador(id)
    jugadores.push(jugador)

    //para recibir sin error el juego
    res.setHeader("Access-Control-Allow-Origin","*")

    res.send(id)
})
//recibir datos
app.post("/mokepon/:jugadorId",(req,res)=>{
    const jugadorId=req.params.jugadorId || ""
    const nombre=req.body.mokepon||""
    const mokepon=new Mokepon(nombre)
    const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId===jugador.id)
    if (jugadorIndex>=0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
  
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if (jugadorIndex >= 0) {
      jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
  
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
    
})

//resivimos la peticion de los botones de ataques
app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
  
    if (jugadorIndex >= 0) {
      jugadores[jugadorIndex].asignarAtaques(ataques)
    }
  
    res.end()
  })
  //solicitando datos
  app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
      ataques: jugador.ataques || []
    })
  })
//iniciar el servidor
app.listen(8080,()=>{
    console.log("servidor arancando")
})