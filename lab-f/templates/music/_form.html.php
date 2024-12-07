<?php
/** @var $music ?\App\Model\Music */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="music[title]" value="<?= $music ? $music->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="artist">Artist</label>
    <input type="text" id="artist" name="music[artist]" value="<?= $music ? $music->getArtist() : '' ?>">
</div>

<div class="form-group">
    <label for="album">Album</label>
    <input type="text" id="album" name="music[album]" value="<?= $music ? $music->getAlbum() : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>

