# RH-System
BackEnd Desenvolvido para sistema de Rh - Professor Elenilton

# Exemplo de como deve ser o body-raw de cadastro funionario:

{
  "nome": "Ludimilo",
  "cpf": "123.456.769-00",
  "cargo": "Eletresista",
  "salarioBase": 9000,
  "comissao": 1000, // Se não há comissão, considerar 0
  "horasExtras": {
    "quantidade": 10,
    "valorHoraExtra": 50
  },
  "adicionais": {
    "noturno": true, // pode ser false tambem
    "insalubridade": true, // pode ser false tambem
    "insalubridadeGrau": "maximo", // pode variar entre: minimo, medio ou maximo
    "periculosidade": 1,
    "tempoServico": 5
  },
  "salarioFamilia": true,
  "diariaViagem": 0,
  "auxilioCrecheBaba": 0,
  "email": "ludimilo@gmail.com",
  "senha": "1234"
}