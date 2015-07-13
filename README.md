# Talks ranking for codemotion

Based on meteor-leaderboard. Just a quick way to get real-time voting from your meetup-community

# Installation
- install meteor, if you don't have it
```bash
curl https://install.meteor.com/ | sh
```

- clone this repository
```bash
git clone https://github.com/ntkog/valoraciones.git
cd valoraciones
```

# Configuration

First of all, you have to create an OAuth Consumer for your meetup App :
```bash
https://secure.meetup.com/meetup_api/oauth_consumers/
```

Once you have *key* and *secret* you are good to go!

WARN! You have to fill a Redirect URI in your OAuth Meetup Consumer. If you are testing locally fill in with 
```bash
http://localhost:3000
```

Once you are ready to deploy in your server, be sure you set an environment variable like the following example.( Do it before you run meteor )
```bash
export ROOT_URL=http://YOUR_IP_OR_DOMAIN
```
and change *Redirect URI* on your OAuth Meetup Consumer Details.

The last step is changing the urlname of your meetup community in server/meetup.js and add your logo in /public folder ( Name it logo.png )



# Run

```bash
meteor
```


# Add-ons

If you want to pre-filter talks that are related with your community , take a look :

```js
function affinity (title, desc, codeLanguage, technologies) {
  var re = /\b(JS|CSS|HTML|NODE|GRUNT|GULP|METEOR|POLYMER|COMPONENTS)\b/gi;
  console.log(title);
  var matchesTitle = title.match(re);
  var matchesDesc = desc.match(re);
  var subjectOK = matchesTitle || matchesDesc ? true : false;
  var langOK = langAffinity.filter(function(l) { 
    return _.contains(codeLanguage,l); 
  });
  var techOK = techAffinity.filter(function(t) { 
    return _.contains(technologies,t); 
  });
  
  return subjectOK || langOK.length > 0 ? 1 : 0;      
}
```

Just add some keywords to the regex , and at import time ,it will add a field called "affinity" with the result of talks that matches in regex ( It will parse each CSV file looking for matching in "Title" and "Description" fields )


