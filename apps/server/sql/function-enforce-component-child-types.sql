CREATE OR REPLACE FUNCTION enforce_component_child_types()
RETURNS TRIGGER AS $$
  DECLARE 
  parent_type INT;
  BEGIN
    IF NEW.parent_id IS NOT NULL AND NOT EXISTS (
      SELECT * 
      FROM allowed_component_child_types 
      WHERE parent_component_type_id = (
        SELECT component_type_id FROM component_data WHERE id = NEW.parent_id
      ) AND child_component_type_id = NEW.component_type_id
    ) THEN 
      RAISE EXCEPTION 'Invalid child component type! Parent type: %, Child type: %',
        (
          SELECT label
          FROM component_type
          WHERE id = (SELECT component_type_id FROM component_data WHERE id = NEW.parent_id LIMIT 1)
        ),
        (SELECT label FROM component_type WHERE id = NEW.component_type_id);
    END IF;

    RETURN NEW;
  END
$$ LANGUAGE PLPGSQL;