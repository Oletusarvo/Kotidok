CREATE OR REPLACE FUNCTION enforce_base_component_type()
RETURNS TRIGGER AS $$
  DECLARE
  base_component_type_id INT;
  enforced_type_id TEXT;
  BEGIN
    SELECT component_type_id INTO base_component_type_id FROM component_data WHERE id = NEW.parent_id;
    SELECT id INTO enforced_type_id FROM component_type WHERE label = ARGV[0];
    IF enforced_type_id <> base_component_type_id THEN 
      RAISE EXCEPTION 'Entries in the table must reference a parent component of type %', enforced_type_label;
    END IF;
    RETURN NEW;
  END;
$$ LANGUAGE PLPGSQL;