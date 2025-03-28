// Dados simulados
let clientes = [];
let contestações = [];
let ocorrencias = [];

// Função para cadastrar cliente
document.getElementById("formCliente").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const dataInstalacao = document.getElementById("dataInstalacao").value;
    const vencimentoConta = document.getElementById("vencimentoConta").value;

    const cliente = {
        nome,
        endereco,
        dataInstalacao,
        vencimentoConta
    };

    clientes.push(cliente);
    atualizarListaClientes();
    atualizarSelectClientes();
    e.target.reset();
});

// Função para atualizar a lista de clientes
function atualizarListaClientes() {
    const tbody = document.getElementById("listaClientes");
    tbody.innerHTML = "";

    clientes.forEach((cliente, index) => {
        const row = `
            <tr>
                <td>${cliente.nome}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.dataInstalacao}</td>
                <td>${cliente.vencimentoConta}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removerCliente(${index})">Remover</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// Função para remover cliente
function removerCliente(index) {
    clientes.splice(index, 1);
    atualizarListaClientes();
    atualizarSelectClientes();
}

// Função para atualizar o select de clientes
function atualizarSelectClientes() {
    const select = document.getElementById("clienteContestacao");
    select.innerHTML = "<option value=''>Selecione um cliente</option>";

    clientes.forEach((cliente, index) => {
        const option = `<option value="${index}">${cliente.nome}</option>`;
        select.innerHTML += option;
    });
}

// Função para registrar contestação
document.getElementById("formContestacao").addEventListener("submit", function (e) {
    e.preventDefault();

    const clienteIndex = document.getElementById("clienteContestacao").value;
    const descricao = document.getElementById("descricaoContestacao").value;

    if (clienteIndex === "") {
        alert("Selecione um cliente!");
        return;
    }

    const contestacao = {
        cliente: clientes[clienteIndex].nome,
        descricao,
        data: new Date().toLocaleDateString()
    };

    contestações.push(contestacao);
    atualizarListaOcorrencias();
    e.target.reset();
});

// Função para atualizar a lista de ocorrências
function atualizarListaOcorrencias() {
    const tbody = document.getElementById("listaOcorrencias");
    tbody.innerHTML = "";

    contestações.forEach(contestacao => {
        const row = `
            <tr>
                <td>${contestacao.cliente}</td>
                <td>${contestacao.descricao}</td>
                <td>${contestacao.data}</td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// Simulação de monitoramento de chuvas
function monitorarChuvas() {
    const alertaChuva = document.getElementById("alertaChuva");
    const hoje = new Date();
    const mes = hoje.getMonth() + 1;

    if (mes >= 11 || mes <= 3) { // Período de chuvas (novembro a março)
        alertaChuva.innerHTML = "⚠️ Período de chuvas intensas. Fique atento à geração de energia!";
        alertaChuva.style.color = "red";
    } else {
        alertaChuva.innerHTML = "✅ Período sem chuvas intensas.";
        alertaChuva.style.color = "green";
    }
}


const apiKey = '2ae057eed16ebdcc86b4620e9a1ba68c';
const cidade = 'Sao Paulo';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const previsao5Dias = [];
        const hoje = new Date().getDate();

        // Filtra as previsões para os próximos dias (aproximadamente)
        data.list.forEach(item => {
            const dataPrevisao = new Date(item.dt * 1000);
            if (dataPrevisao.getDate() > hoje && previsao5Dias.filter(p => new Date(p.dt * 1000).toDateString() === dataPrevisao.toDateString()).length < 1) {
                previsao5Dias.push(item);
                if (previsao5Dias.length >= 5) return; // Limitar a 5 dias
            }
        });

        // Exibir a previsão no HTML
        const previsaoDiv = document.getElementById('previsao-dias');
        if (previsaoDiv) {
            previsao5Dias.forEach(dia => {
                const data = new Date(dia.dt * 1000).toLocaleDateString();
                const temperaturaMaxima = Math.round(dia.main.temp_max);
                const temperaturaMinima = Math.round(dia.main.temp_min);
                const descricao = dia.weather[0].description;
                const icone = `https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`;

                const diaDiv = document.createElement('div');
                diaDiv.innerHTML = `
          <h3>${data}</h3>
          <img src="${icone}" alt="${descricao}">
          <p>${descricao}</p>
          <p>Máx: ${temperaturaMaxima}°C / Mín: ${temperaturaMinima}°C</p>
        `;
                previsaoDiv.appendChild(diaDiv);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar previsão do tempo:', error);
        // Exibir uma mensagem de erro para o usuário
    });




// deslogar usuário
document.getElementById('logout').addEventListener("click", function () {
    alert("deslogado com sucesso!");
    window.location.href = 'login.html'
})



// Inicialização
monitorarChuvas();
