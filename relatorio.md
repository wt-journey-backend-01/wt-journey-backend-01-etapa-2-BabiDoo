<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - BabiDoo

**Data:** 04/09/2025 13:08

**Nota Final:** `84.17/100`
**Status:** ✅ Aprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `3` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `CREATE: Recebe status code 404 ao tentar criar caso com id de agente inválido/inexistente`
    - **Melhoria sugerida**: Ao tentar criar um caso com um `agente_id` inexistente, o teste não recebeu `404 Not Found`. Sua API deve ser capaz de identificar que o agente referenciado não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar um caso por completo com método PUT com payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de casos (`PUT /casos/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 404 ao tentar atualizar um caso parcialmente com método PATCH de um caso inexistente`
    - **Melhoria sugerida**: Ao tentar atualizar um caso inexistente com `PATCH /casos/:id`, o teste não recebeu `404 Not Found`. Certifique-se de que sua rota verifica a existência do recurso antes de tentar a atualização.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Nenhum item bônus foi identificado. Tente adicionar mais estilo e complexidade ao seu código nas próximas tentativas!

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Foram encontrados `2` problemas que acarretam descontos. Veja abaixo os testes penalizados:
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com data de incorporação no futuro`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com uma `dataDeIncorporacao` no futuro. Datas de incorporação não devem ser futuras. Implemente uma validação para impedir isso.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com cargo vazio`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com `cargo` vazio. Campos obrigatórios como o cargo não devem ser aceitos se estiverem vazios.

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>