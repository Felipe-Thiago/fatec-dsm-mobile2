//Constantes
const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User } = require('./models');

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.post('/create', async(req,res) => {
    let reqs = await User.create({
        'name': req.body.nameUser,
        'password': req.body.passwordUser,
        'email': req.body.emailUser,
        'createdAt': new Date(),
        'updatedAt': new Date()
    });
    
    if(reqs){
        res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
    }
})

//Rota para listar
app.get('/users', async (req, res) => {
    try{
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários'})
    }
})

//Rota para deletar usuário
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const user = await User.findByPk(id);

        if(!user) {
            return res.status(404).json({ error: 'Usuário não encontrado'});
        }

        await user.destroy();
        res.json({message: 'Usuário deletado com sucesso!'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar usuário'})
    }
})

//Start server
let port = 3000;
app.listen(port, (req, res) => {
    console.log(`Servidor rodando na porta ${port}`)
})