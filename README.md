# fis-optimizer-html-minifier
Compress htmlfile include inline script and inline style for fis

## Usage

```
git clone https://github.com/millylee/fis-optimizer-html-minifier.git
cd fis-optimizer-html-minifier
npm i
```
## Fis2

```
fis.config.set('modules.optimizer.html', 'html-minifier');
```

## Fis3

```
fis.match('*.html', {
    optimizer: fis.plugin('html-minifier')
})
```