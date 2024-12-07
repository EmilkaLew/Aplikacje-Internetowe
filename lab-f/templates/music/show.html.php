<?php

/** @var \App\Model\Music $music */
/** @var \App\Service\Router $router */

$title = "{$music->getTitle()} by {$music->getArtist()} ({$music->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($music->getTitle()) ?> - <?= htmlspecialchars($music->getArtist()) ?></h1>
    <article>
        <p><strong>Title:</strong> <?= htmlspecialchars($music->getTitle()) ?></p>
        <p><strong>Artist:</strong> <?= htmlspecialchars($music->getArtist()) ?></p>
        <p><strong>Album:</strong> <?= htmlspecialchars($music->getAlbum()) ?></p>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('music-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('music-edit', ['id'=> $music->getId()]) ?>">Edit</a></li>
        <li>
            <form action="<?= $router->generatePath('music-delete', ['id' => $music->getId()]) ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure you want to delete this music?')">
            </form>
        </li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
