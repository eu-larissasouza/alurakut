import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '80ea183e531d8aa5b11f51161bc9a3';
    const client = new SiteClient(TOKEN);

    // Validar os dados, antes de sair cadastrando
    const recordCreated = await client.items.create({
      itemType: '972884', // ID do Model de "Community" criado pelo Dato
      ...request.body,
      // title: "Comunidade de Teste",
      // imageUrl: "https://github.com/omariosouto.png",
      // creatorSlug: "omariosouto"
    });

    console.log(recordCreated);

    response.json({
      dados: record,
      recordCreated: recordCreated,
    });
    return;
  }

  response.status(404).json({
    message:
      'Unfortunately we dont have anything in GET yet, but in POST there is!',
  });
}
