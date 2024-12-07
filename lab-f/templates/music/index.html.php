<?php

/** @var \App\Model\Music[] $musicList */
/** @var \App\Service\Router $router */

$title = 'Music List';
$bodyClass = 'music-index';

ob_start(); ?>
    <h1>Music List</h1>

    <a href="<?= $router->generatePath('music-create') ?>">Add New Music</a>

    <ul class="music-list">
        <?php foreach ($musicList as $music): ?>
            <li>
                <h3><?= $music->getTitle() ?> - <?= $music->getArtist() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('music-show', ['id' => $music->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('music-edit', ['id' => $music->getId()]) ?>">Edit</a></li>
                    <li><a href="<?= $router->generatePath('music-delete', ['id' => $music->getId()]) ?>">Delete</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
