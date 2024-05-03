<?php

namespace App\Traits;

use Str, Arr;

use App\Models\Branch,
	App\Models\Department,
	App\Models\Program;

trait Getter
{
	public function getIndexData($model,  $getForeign = [], $only = []){

		foreach($model as $modelCtr => $modelValue){

			$keyName = array_keys($modelValue->toArray());

			for ($i=0; $i < count($keyName); $i++) {

				if ($this->showOnly($keyName[$i], $only)) {

					$data[$modelCtr][$i] = [Str::camel($keyName[$i]) => $modelValue[$keyName[$i]]];
				}

				if(in_array("full_name", $only)){

					$data[$modelCtr][] = ["fullName" => "{$modelValue['last_name']}, {$modelValue['first_name']} {$modelValue['middle_name']}"];
				}

				if ($only == []) {

					$data[$modelCtr][$i] = [Str::camel($keyName[$i]) => $modelValue[$keyName[$i]]];
				}
			}

			if (Arr::accessible($getForeign)) {

				foreach (collect($getForeign) as $foreignKey => $foreignKeyData) {

					foreach ($foreignKeyData as $foreignValue) {

						if ($modelValue->$foreignKey) {

							if($foreignValue != 'full_name'){

								$foreign[Str::camel($foreignKey)][Str::camel($foreignValue)] = $modelValue->$foreignKey->$foreignValue;
							}
							else {

								$foreign[Str::camel($foreignKey)]['fullName'] = $modelValue->$foreignKey ? "{$modelValue->$foreignKey->last_name}, {$modelValue->$foreignKey->first_name} {$modelValue->$foreignKey->middle_name}":'';
							}

						}else{

							$foreign[$foreignKey] = null;
						}

					}

				}
			}

			$groupData[$modelCtr] = Arr::collapse([Arr::collapse($data[$modelCtr]), $foreign ?? []]);
		}

		return $groupData ?? [];

	}


	public function showOnly($keyName, $only){

		foreach ($only as $onlyCtr => $onlyKeyName) {

            if ($keyName == $onlyKeyName) {

                return true;
            }
        }

        return false;
	}



	public function getShowData($model, $getForeign = [], $only = []){

		$keyName = array_keys($model->toArray());

		for ($i=0; $i < count($keyName); $i++) {

			if ($this->showOnly($keyName[$i], $only)) {

				$data[$i] = [Str::camel($keyName[$i]) => $model[$keyName[$i]]];
			}

			if ($only == []) {

				$data[$i] = [Str::camel($keyName[$i]) => $model[$keyName[$i]]];
			}

		}


		if (Arr::accessible($getForeign)) {

			foreach (collect($getForeign) as $foreignKey => $foreignKeyData) {

				foreach ($foreignKeyData as $foreignValue) {

					if ($model->$foreignKey) {

						$foreign[Str::camel($foreignKey)][Str::camel($foreignValue)] = $model->$foreignKey->$foreignValue;

					}else{

						$foreign[$foreignKey] = null;
					}
				}
			}
		}


		return Arr::collapse([Arr::collapse($data), $foreign ?? []]);

	}


	protected function getDepartmentId($departmentCode){

		$department = Department::where("department_code", "=", strtoupper($departmentCode))->firstOrFail();
		return $department->id;

    }


}
