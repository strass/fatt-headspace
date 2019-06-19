import Discord, { TextChannel, Message } from "discord.js";
const client = new Discord.Client();
import env from "../env.json";

client.on("ready", async () => {
  console.log(`ready`);
  try {
    const headspace = client.channels.find(
      (_v, key) => key === "590682286438088704"
      // "536258944730005511" // fatt/general-bad-headspace
      // "590682286438088704" // testing channel
    ) as TextChannel;

    if (headspace && headspace.type === "text") {
      headspace.startTyping();
      while ((await headspace.fetchMessages({ limit: 100 })).size > 0) {
        const deleted = await headspace.bulkDelete(100);
        console.log(`deleted ${deleted.size} messages`);
      }
      console.log("reposting message");
      const repost = (await headspace.send(`This is our bad headspace channel, a place to clear your mind, vent, give and receive support! You can remove yourself from this channel with ".iam avoiding-badheadspace" in #i-am-i-am-not at any time. Use this as needed, the option is here for your health and peace of mind!

Because of the nature of this channel, we have some additional rules:
-Messages in this channel are cleared at 10:30 AM EST for everyone's safety and privacy. Don't screen cap messages here and post them elsewhere, doing so will result in a ban from the server
-Never @ another member in this channel
-Ask before giving advice
-Don't ask anyone for details they aren't willing to share or assume anything about their situation.
-Don't be dismissive of other people's feelings, don't try to one-up or eclipse their problems with your own. Let's all be understanding and uplift each other.
-Be considerate of other people's tolerance for jokes or despair about the topics discussed here. Jokes can be triggering or upsetting in ways you may not intend and giving into hopelessness helps no one. 

Please reach out to a mod if you feel someone is being disrespectful or out of line instead of escalating. Access to this channel can be revoked and attempts to bypass that will result in being banned from the server.

Should you need them, here are some resources:
Lines for Life: https://www.linesforlife.org/
800 273 8255 / Text 273TALK to 839863
Trans Lifeline: https://www.translifeline.org/
US: 877 565 8860 / CA: 877 330 6366 
Crisis Text Line: https://www.crisistextline.org/
Text HOME to 741741`)) as Message;
      repost.pin();
      headspace.stopTyping();
    } else {
      console.error(
        "Something went wrong. Expected a text channel but got: ",
        JSON.stringify(headspace)
      );
    }
  } catch (ex) {
    console.error(ex);
  }
});

client.login(env.token);
