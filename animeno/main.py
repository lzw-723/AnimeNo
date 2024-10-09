import os.path
from datetime import datetime, timezone, timedelta, tzinfo
from wsgiref.simple_server import make_server

import arrow
import falcon
from requests import request


class QuoteResource:

    def on_get(self, req, resp):
        """Handles GET requests"""
        quote = {
            'quote': (
                "I've always been more interested in "
                "the future than in the past."
            ),
            'author': 'Grace Hopper'
        }

        resp.media = quote


class BanguimResource:

    def on_get(self, req, resp):
        """Handles GET requests"""
        resp.media = bangumi


bangumi = {"Sun":[], "Mon":[], "Tue":[], "Wed":[], "Thu":[], "Fri":[], "Sat":[]}

# http请求
req = request('get', 'https://bgmlist.com/api/v1/bangumi/onair')
bgms = req.json()

for b in bgms['items']:
    print(b['title'])
    bb = {'localeTitle': b['title'], 'title': b['title'], 'type': b['type'], 'lang': b['lang'],
          'titleTranslate': b['titleTranslate'], 'officialSite': b['officialSite']}
    if 'titleTranslate' in b:
        if 'zh-Hans' in b['titleTranslate']:
            bb['localeTitle'] = b['titleTranslate']['zh-Hans'][0]
            print(b['titleTranslate']['zh-Hans'][0])
        elif 'zh-Hant' in b['titleTranslate']:
            bb['localeTitle'] = b['titleTranslate']['zh-Hant'][0]
    bb['begin'] = b['begin']
    if 'broadcast' in b and len(b['broadcast']) > 0:
        # R/2009-04-04T09:00:00.000Z/P7D
        bb['broadcast'] = b['broadcast']
        broadcast = b['broadcast'].split('/')[1]
        weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        week_index = arrow.get(broadcast).to('Asia/Shanghai').weekday()
        bangumi[weekdays[week_index]].append(bb)
        print(arrow.get(broadcast).to('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss'))
        print()

app = falcon.App()
app.add_static_route('/', os.path.join(os.path.abspath(os.path.dirname(__file__)), '../front'), fallback_filename='index.html')
app.add_route('/api/v1/quote', QuoteResource())
app.add_route('/api/v1/bangumi', BanguimResource())

if __name__ == '__main__':
    with make_server('', 8000, app) as httpd:
        print('Serving on port 8000...')
        print("server started")

        # Serve until process is killed
        httpd.serve_forever()
