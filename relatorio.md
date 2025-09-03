<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - BabiDoo

**Data:** 03/09/2025 18:17

**Nota Final:** `67.45/100`
**Status:** ❌ Reprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `9` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados do agente com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de agentes (`PUT /agentes/:id`) não funcionou. O teste esperava um status `200 OK` e o agente com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados do agente com por completo (com PATCH) corretamente`
    - **Melhoria sugerida**: A atualização parcial de agentes (`PATCH /agentes/:id`) falhou. O teste esperava um status `200 OK` e o agente com os dados parcialmente atualizados. Verifique se sua rota está recebendo o payload parcial e aplicando as mudanças sem sobrescrever o objeto inteiro.
  - ⚠️ **Falhou no teste**: `READ: Recebe status 404 ao tentar buscar um agente inexistente`
    - **Melhoria sugerida**: Ao tentar buscar um agente com ID inexistente (`GET /agentes/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar agente por completo com método PUT e payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de agentes (`PUT /agentes/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar agente por parcialmente com método PATCH de agente inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um agente inexistente com `PATCH /agentes/:id`, o teste não recebeu `404 Not Found`. Certifique-se de que sua rota verifica a existência do recurso antes de tentar a atualização.
  - ⚠️ **Falhou no teste**: `CREATE: Recebe status code 404 ao tentar criar caso com id de agente inválido/inexistente`
    - **Melhoria sugerida**: Ao tentar criar um caso com um `agente_id` inexistente, o teste não recebeu `404 Not Found`. Sua API deve ser capaz de identificar que o agente referenciado não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `READ: Recebe status code 404 ao tentar buscar um caso por ID inválido`
    - **Melhoria sugerida**: Ao tentar buscar um caso com ID inexistente (`GET /casos/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar um caso por completo com método PUT de um caso inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um caso inexistente com `PUT /casos/:id`, o teste não recebeu `404 Not Found`. A rota deve indicar que o recurso não foi encontrado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar um caso parcialmente com método PATCH de um caso inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um caso inexistente com `PATCH /casos/:id`, o teste não recebeu `404 Not Found`. Certifique-se de que sua rota verifica a existência do recurso antes de tentar a atualização.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Nenhum item bônus foi identificado. Tente adicionar mais estilo e complexidade ao seu código nas próximas tentativas!

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Foram encontrados `1` problemas que acarretam descontos. Veja abaixo os testes penalizados:
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com data de incorporação no futuro`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com uma `dataDeIncorporacao` no futuro. Datas de incorporação não devem ser futuras. Implemente uma validação para impedir isso.

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>