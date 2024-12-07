<?php
namespace App\Model;

use App\Service\Config;

class Music
{
private ?int $id = null;
private ?string $title = null;
private ?string $artist = null;
private ?string $album = null;

public function getId(): ?int
{
return $this->id;
}

public function setId(?int $id): Music
{
$this->id = $id;

return $this;
}

public function getTitle(): ?string
{
return $this->title;
}

public function setTitle(?string $title): Music
{
$this->title = $title;

return $this;
}

public function getArtist(): ?string
{
return $this->artist;
}

public function setArtist(?string $artist): Music
{
$this->artist = $artist;

return $this;
}

public function getAlbum(): ?string
{
return $this->album;
}

public function setAlbum(?string $album): Music
{
$this->album = $album;

return $this;
}

public static function fromArray($array): Music
{
$music = new self();
$music->fill($array);

return $music;
}

public function fill($array): Music
{
if (isset($array['id']) && !$this->getId()) {
$this->setId($array['id']);
}
if (isset($array['title'])) {
$this->setTitle($array['title']);
}
if (isset($array['artist'])) {
$this->setArtist($array['artist']);
}
if (isset($array['album'])) {
$this->setAlbum($array['album']);
}

return $this;
}

public static function findAll(): array
{
$pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
$sql = 'SELECT * FROM music';
$statement = $pdo->prepare($sql);
$statement->execute();

$musicList = [];
$musicArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
foreach ($musicArray as $musicData) {
$musicList[] = self::fromArray($musicData);
}

return $musicList;
}

public static function find($id): ?Music
{
$pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
$sql = 'SELECT * FROM music WHERE id = :id';
$statement = $pdo->prepare($sql);
$statement->execute(['id' => $id]);

$musicData = $statement->fetch(\PDO::FETCH_ASSOC);
if (!$musicData) {
return null;
}
return self::fromArray($musicData);
}

public function save(): void
{
$pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
if (!$this->getId()) {
$sql = "INSERT INTO music (title, artist, album) VALUES (:title, :artist, :album)";
$statement = $pdo->prepare($sql);
$statement->execute([
'title' => $this->getTitle(),
'artist' => $this->getArtist(),
'album' => $this->getAlbum(),
]);

$this->setId($pdo->lastInsertId());
} else {
$sql = "UPDATE music SET title = :title, artist = :artist, album = :album WHERE id = :id";
$statement = $pdo->prepare($sql);
$statement->execute([
':title' => $this->getTitle(),
':artist' => $this->getArtist(),
':album' => $this->getAlbum(),
':id' => $this->getId(),
]);
}
}

public function delete(): void
{
$pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
$sql = "DELETE FROM music WHERE id = :id";
$statement = $pdo->prepare($sql);
$statement->execute([':id' => $this->getId()]);

$this->setId(null);
$this->setTitle(null);
$this->setArtist(null);
$this->setAlbum(null);
}
}
