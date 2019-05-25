const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const color = require('colors');
const fs = require('fs');
const path = require('path')


ffmpeg.setFfmpegPath(ffmpegPath);

const callback = function() {
    console.log('done..,')
}

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

        ffmpeg(`public/source/${file}`, { timeout: 432000 }).addOptions([
            '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
            '-level 3.0', 
            '-start_number 0',     // start the first .ts segment at index 0
            '-hls_time 10',        // 10 second segment duration
            '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
            '-f hls'               // HLS format
          ]).output(`public/streams/${file.replace(/\.mp4/, '')}.m3u8`).on('end', () => {
              console.log('Playlists status: well done.'.green)
              process.exit()
          }).run()
          
      }
    });
    return filelist;
  };

walkSync('./public/source', [])


