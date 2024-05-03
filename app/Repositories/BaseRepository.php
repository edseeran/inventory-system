<?php

namespace App\Repositories;

use App\Traits\Generator,
    App\Traits\Getter,
    App\Traits\ResponseAPI;

class BaseRepository
{
    use Generator, Getter, ResponseAPI;
}