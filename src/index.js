import app from './app';
import '@babel/polyfill';

function main() {
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), () => {
        console.log('server on port', app.get('port'));
    });
}

main();
