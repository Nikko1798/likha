<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Crypt;
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


    //accessorrs and mutators
    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Crypt::decrypt($value),
            set: fn ($value) => Crypt::encrypt($value),
        );
    }
}
