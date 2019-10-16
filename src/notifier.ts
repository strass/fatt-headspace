import Discord, { TextChannel, Message } from 'discord.js';
import fetch from 'node-fetch';

const sleep = async (timeout: number) => new Promise(res => setTimeout(res, timeout));

export default async (event: any) => {
  let done = false;
  let seconds = 0;
  const client = new Discord.Client();

  client.on('ready', async () => {
    console.log(`ready`);

    try {
      const headspace = client.channels.find(
        (_v, key) => key === process.env.CHANNEL_ID
        // "536258944730005511" // fatt/general-bad-headspace
        // "590682286438088704" // testing channel
      ) as TextChannel;

      if (headspace && headspace.type === 'text') {
        try {
          headspace.startTyping();
        } catch (ex) {
          console.error('error startTyping');
        }

        let repost: any = false;
        try {
          console.log('fetching template');
          const response = await fetch(
            'https://raw.githubusercontent.com/strass/fatt-headspace/master/notify.txt'
          );
          const text = await response.text();
          console.log('body response:');
          console.log(text);
          console.log('reposting message');
          repost = (await headspace.send(text)) as Message;
          console.log('!!!');
          console.log(repost);
          console.log('!!!');
        } catch (ex) {
          console.error(`Failed reposing message:`, ex);
        } finally {
          console.log('stop typing');
          headspace.stopTyping();
        }
      } else {
        console.error(
          'Something went wrong. Expected a text channel but got: ',
          JSON.stringify(headspace)
        );
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      console.log('finally case');
      done = true;
    }
  });

  client.login(process.env.DISCORD_TOKEN);

  while (!done) {
    seconds += 0.25;
    await sleep(250);
  }

  console.log('done thinking');

  return { seconds };
};
