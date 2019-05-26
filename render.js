const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const color = require('colors');
const fs = require('fs');
const path = require('path')


ffmpeg.setFfmpegPath(ffmpegPath);

const callback = function() {
    console.log('done..,')
}

const ffPromises = []

var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);

    filelist = filelist || [];
    files.forEach(function(file) {
      
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        filelist = walkSync(dir + '/' + file, filelist);
      }
      else {
        filelist.push(file);
        const fileName = file.replace(/\.mp4/, '')

        ffPromises.push(new Promise((resolve) => {
          fs.mkdir(`public/streams/${fileName}`, (err) => {
            ffmpeg(`public/sources/${file}`, { timeout: 432000 }).addOptions([
                '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
                '-level 3.0', 
                '-start_number 0',     // start the first .ts segment at index 0
                '-hls_time 10',        // 10 second segment duration
                '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
                '-f hls'               // HLS format
              ]).output(`public/streams/${fileName}/${fileName}.m3u8`).on('end', () => {
                  console.log('🚛 Hls compilation complete:'.green)
                  console.log(`✅\thttp://127.0.0.1:8000/public/streams/${fileName}/${fileName}.m3u8`.red)
                  resolve();
              }).run()
            })
        }))
      }
    });
    return filelist;
  };

console.clear()
console.log('👨\tIn progress...'.blue)
walkSync('./public/sources', [])

Promise.all(ffPromises).then(() => {
  console.log('😎 All videos was successful converted\n\n\n'.green)
  process.exit()
})


