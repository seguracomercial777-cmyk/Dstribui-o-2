# 🚀 Segura Ferramentas para Usinagem - Site Profissional (Setor Metal-Mecânico)

Site estático de alta performance, otimizado para SEO local, conversão B2B e conformidade com a LGPD. Foco total em autoridade técnica para o setor metal-mecânico.

## 📁 Estrutura de Arquivos
- `index.html`: Página principal com copy técnico, catálogo e seções de conversão.
- `politica-privacidade.html`: Texto legal LGPD adaptado para dados corporativos B2B.
- `codigo-etica.html`: Diretrizes de conduta, anticorrupção e qualidade.
- `style.css`: Estilos premium, paleta industrial, modo escuro e responsividade.
- `script.js`: Lógica de UTM, cookies, dark mode e formulários com fallback.

## ⚙️ Configuração de Marketing (PRÉ-LANÇAMENTO)

1. **Abra o `index.html`** e localize os blocos marcados com `🚨`.
2. Substitua os placeholders pelos seus IDs reais:
   - `[INSIRA SEU GA4 ID AQUI]` → Ex: `G-XXXXXXXXXX`
   - `[INSIRA SEU ADS ID AQUI]` → Ex: `AW-XXXXXXXXX`
   - `[INSIRA SEU GTM ID AQUI]` → Ex: `GTM-XXXXXXX`
   - `[INSIRA SEU META PIXEL ID AQUI]` → Ex: `1234567890`
3. **Domínio:** Atualize a tag `<link rel="canonical">` e as meta tags Open Graph com o domínio real (ex: `https://www.seguraferramentas.com.br`).

## ✅ Checklist de Testes Obrigatórios

- [ ] **Teste de Responsividade:** Abra no Chrome DevTools (F12). Verifique se a barra fixa inferior ("Ligar" / "WhatsApp") aparece apenas no mobile e não sobrepõe o botão flutuante.
- [ ] **Teste de UTM:** Acesse `index.html?utm_source=google&utm_campaign=cnc`. Clique no botão do WhatsApp. A mensagem pré-preenchida deve conter "Vim por: google".
- [ ] **Teste de Cookies LGPD:** Abra uma aba anônima. O banner deve aparecer. Clique em "Apenas Essenciais". Abra o console (F12) e envie o formulário. O `gtag` NÃO deve ser disparado (verifique o `console.log`).
- [ ] **Teste de Modo Escuro:** Clique no ícone da lua. Recarregue a página. O tema deve persistir (verificado via LocalStorage).

## 🌐 Publicação (Hospedagem Estática Gratuita e Rápida)
1. Crie uma conta no **Netlify** ou **Vercel**.
2. Arraste a pasta contendo estes 6 arquivos para a área de "Deploy".
3. Configure seu domínio personalizado nas configurações da plataforma.
4. Ative o HTTPS (automático nessas plataformas).

---
*Desenvolvido com foco em performance, acessibilidade e conversão para o setor industrial.*