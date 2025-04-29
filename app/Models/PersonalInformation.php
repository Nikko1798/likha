<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PersonalInformation extends Model
{
    //
    protected $guarded=[];
    function addresses(){
        return $this->hasMany(Address::class);
    }
    function contact_details(){
        return $this->hasMany(Address::class);
    }
    function crafts(){
        return $this->hasMany(Craft::class);
    }
    function educational_backgrounds(){
        return $this->hasMany(EducationalBackground::class);
    }
    function family_backgrounds(){
        return $this->hasMany(FamilyBackground::class);
    }
    function artisan_info(){
        return $this->hasOne(ArtisanInfo::class);
    }
}
