const NewsService = {

  async getContribution(news, withData) {
    const records = await Record.find({
      action: ['updateNewsStatus', 'updateNewsDetail', 'createNews'],
      target: news.id,
    }).populate('client');

    for (const record of records) {
      if (!withData) {
        delete record.data;
      }
      if (record.client) {
        record.client = ClientService.sanitizeClient(record.client);
      }
    }

    return records;
  },

  async getContributionByList(newsList) {
    const queue = [];

    const getContribution = async (news) => {
      news.contribution = await NewsService.getContribution(news);
    };
    for (const news of newsList) {
      queue.push(getContribution(news));
    }

    await Promise.all(queue);
    return newsList;
  },

};

module.exports = NewsService;
