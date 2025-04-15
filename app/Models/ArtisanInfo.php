<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArtisanInfo extends Model
{
    //
    protected $guarded=[];
    public function personal_information(){
        $this->belongsTo(PersonalInformation::class);
    }
}
